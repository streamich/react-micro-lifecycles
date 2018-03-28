import microLifecycles from '../microLifecycles';

global.MutationObserver = function () {};
global.MutationObserver.prototype.observe = function () {};

describe('microLifecycles()', () => {
    it('exists', () => {
        expect(typeof microLifecycles).toBe('function');
    });

    it('does not create .ref, if not necessary', () => {
        const $attach = jest.fn();
        const props = {
            foo: 'bar'
        };

        const newProps = microLifecycles(props);

        expect(typeof newProps.ref).toBe('undefined');
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

    it('$update', () => {
        const $update = jest.fn();
        const props = {
            $update,
            foo: 'bar'
        };

        let newProps = microLifecycles(props);

        expect(typeof newProps.ref).toBe('function');
        expect($update).toHaveBeenCalledTimes(0);

        newProps.ref(null);

        expect($update).toHaveBeenCalledTimes(0);

        const el = {};

        newProps.ref(el);

        expect($update).toHaveBeenCalledTimes(0);

        newProps.ref(el);

        expect($update).toHaveBeenCalledTimes(1);
        expect($update.mock.calls[0][0]).toBe(el);
        expect($update.mock.calls[0][1]).toMatchObject({
            foo: 'bar'
        });

        newProps = microLifecycles({
            $update,
            foo: 'bar2'
        });
        newProps.ref(null);
        newProps.ref(el);

        expect($update).toHaveBeenCalledTimes(2);
        expect($update.mock.calls[1][0]).toBe(el);
        expect($update.mock.calls[1][1]).toMatchObject({
            foo: 'bar2'
        });
    });
});