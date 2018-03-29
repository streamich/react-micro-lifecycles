const sym = typeof Symbol === 'object' ? Symbol('mcycles') : '@@mcycles';
const noop = () => {};

const microLifecycles = props => {
    const $attach = props.$attach;
    const $update = props.$update;
    const $detach = props.$detach;
    const ref = props.ref;

    let rest = props;

    if (process.env.NODE_ENV !== 'production') {
        rest = Object.assign({}, props);
    }

    delete rest.$attach;
    delete rest.$update;
    delete rest.$detach;

    if (!$attach && !$update && !$detach)
        return props;

    rest.ref = el => {
        if (process.env.NODE_ENV !== 'production') {
            if (ref && typeof ref !== 'function') {
                console.error(
                    `react-micro-lifecycles received props with ref, expected ref to be a function, "${typeof ref}" provided.`
                );
            }
        }

        if (ref) ref(el);

        if (!el) return;
    
        if (!el[sym]) {
            el[sym] = props;
    
            const observer = new MutationObserver(mutations => {
                for (let i = 0; i < mutations.length; i++) {
                    const mutation = mutations[i];
    
                    if (mutation.removedNodes.length) {
                        const nodes = mutation.removedNodes;
    
                        for (let j = 0; j < nodes.length; j++) {
                            if (nodes[j] === el) {
                                observer.disconnect();
    
                                const oldProps = el[sym];
    
                                (oldProps.$detach || noop)(el, oldProps);
    
                                return;
                            }
                        }
                    }
                }
            });
    
            observer.observe(el.parentNode, {childList: true});

            ($attach || noop)(el, props);
    
            return;
        }
    
        const oldProps = el[sym];
    
        el[sym] = props;
        ($update || noop)(el, props, oldProps);
    };

    return rest;
};

const createHyperscriptUnstable = (h) => {
    return (...args) => {
        args[1] = microLifecycles(args[1] || {});

        return h(...args);
    };
};


export default createHyperscriptUnstable;
