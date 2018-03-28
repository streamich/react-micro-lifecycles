import microLifecycles from '../microLifecycles';

global.MutationObserver = function () {};
global.MutationObserver.prototype.observe = function () {};

describe('microLifecycles()', () => {
    it('exists', () => {
        expect(typeof microLifecycles).toBe('function');
    });

    it('$attach', () => {
        const $attach = jest.fn();
        const props = {
            $attach,
            foo: 'bar'
        };
        const newProps = microLifecycles(props);

        expect(typeof newProps.ref).toBe('function');
        expect($attach).toHaveBeenCalledTimes(0);

        newProps.ref(null);

        expect($attach).toHaveBeenCalledTimes(0);

        const el = {};

        newProps.ref(el);

        expect($attach).toHaveBeenCalledTimes(1);
        expect($attach.mock.calls[0][0]).toBe(el);
        expect($attach.mock.calls[0][1]).toMatchObject({
            foo: 'bar'
        });

        newProps.ref(el);

        expect($attach).toHaveBeenCalledTimes(1);

        newProps.ref(null);

        expect($attach).toHaveBeenCalledTimes(1);

        newProps.ref(el);

        expect($attach).toHaveBeenCalledTimes(1);
    });
});