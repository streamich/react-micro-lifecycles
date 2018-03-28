import microLifecycles from './microLifecycles';

const createHyperscript = (h) => {
    return (...args) => {
        args[1] = microLifecycles(args[1] || {});

        return h(...args);
    };
};

export default createHyperscript;
