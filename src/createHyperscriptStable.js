const noop = () => {};

const createHyperscriptStable = (h, Component) => {
    class Lifecycles extends Component {
        static defaultProps = {
            $attach: noop,
            $update: noop,
            $detach: noop,
            $ref: noop,
        };
    
        ref = (el) => {
            this.el = el;
            this.props.$ref(el);
        };
      
        componentDidMount () {
            const {$attach, $update, $detach, $ref, $as, ...rest} = this.props;
    
            return $attach(this.el, rest);
        }
      
        componentDidUpdate (prevProps) {
            const {$attach, $update, $detach, $ref, $as, ...rest} = this.props;
            const {$attach: a, $update: b, $detach: c, $ref: d, $as: e, ...prevRest} = prevProps;
    
            return $update(this.el, rest, prevRest);
        }
      
        componentWillUnmount () {
            const {$attach, $update, $detach, $ref, $as, ...rest} = this.props;
    
            return $detach(this.el, rest);
        }
      
        render () {
            const {$attach, $update, $detach, $ref, $as, ...rest} = this.props;
    
            rest.ref = this.ref;
    
            return h($as, rest);
        }
    }

    return (type, props, ...children) => {
        if (!props || (typeof type !== 'string'))
            return h(type, props, ...children);
    
        if (!props.$attach && !props.$update && !props.$detach)
            return h(type, props, ...children);

        if (process.env.NODE_ENV !== 'production') {
            if (props.ref && typeof props.ref !== 'function') {
                console.error(
                    `react-micro-lifecycles received props with ref, expected ref to be a function, "${typeof props.ref}" provided.`
                );
            }
        }

        props.$ref = props.ref;
        props.$as = type;

        delete props.ref;

        return h(Lifecycles, props, ...children);
    };
};

export default createHyperscriptStable;
