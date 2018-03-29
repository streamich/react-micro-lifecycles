'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHyperscript = undefined;

var _microLifecycles = require('./microLifecycles');

var _microLifecycles2 = _interopRequireDefault(_microLifecycles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHyperscript = exports.createHyperscript = function createHyperscript(h) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args[1] = (0, _microLifecycles2.default)(args[1] || {});

        return h.apply(undefined, args);
    };
};