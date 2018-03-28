'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sym = (typeof Symbol === 'undefined' ? 'undefined' : _typeof(Symbol)) === 'object' ? Symbol('mcycles') : '@@mcycles';
var noop = function noop() {};

var microLifecycles = function microLifecycles(props) {
    var $attach = props.$attach,
        $update = props.$update,
        $detach = props.$detach,
        ref = props.ref,
        rest = _objectWithoutProperties(props, ['$attach', '$update', '$detach', 'ref']);

    if (process.env.NODE_ENV !== 'production') {
        if (ref && typeof ref !== 'function') {
            console.error('micro-lifecycles received props with ref, expected ref to be a function, "' + (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) + '" provided.');
        }
    }

    if (!$attach && !$update && !$detach) return props;

    rest.ref = function (el) {
        if (ref) ref(el);

        if (!el) return;

        var ctx = void 0;

        if (!el[sym]) {
            el[sym] = props;

            var observer = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];

                    if (mutation.removedNodes.length) {
                        var nodes = mutation.removedNodes;

                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[j] === el) {
                                observer.disconnect();

                                var _oldProps = el[sym];

                                (_oldProps.$detach || noop)(el, _oldProps);

                                return;
                            }
                        }
                    }
                }
            });

            observer.observe(el.parentNode, { childList: true });

            ($attach || noop)(el, props);

            return;
        }

        var oldProps = el[sym];

        el[sym] = props;
        ($update || noop)(el, props, oldProps);
    };

    return rest;
};

exports.default = microLifecycles;