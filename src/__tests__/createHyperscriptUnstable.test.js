import createHyperscriptUnstable from '../createHyperscriptUnstable';

global.MutationObserver = function () {};
global.MutationObserver.prototype.observe = function () {};

describe('createHyperscriptUnstable()', () => {
    it('exists', () => {
        expect(typeof createHyperscriptUnstable).toBe('function');
    });

    it('does not create .ref, if not necessary', () => {
        const $attach = jest.fn();
        const props = {
            foo: 'bar'
        };
        const createElement = jest.fn();
        const h = createHyperscriptUnstable(createElement);

        h('div', props);

        const newProps = createElement.mock.calls[0][1];

        expect(typeof newProps.ref).toBe('undefined');
    });

    it('$attach', () => {
        const $attach = jest.fn();
        const props = {
            $attach,
            foo: 'bar'
        };
        const createElement = jest.fn();
        const h = createHyperscriptUnstable(createElement);

        h('div', props);

        const newProps = createElement.mock.calls[0][1];

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
        const createElement = jest.fn();
        const h = createHyperscriptUnstable(createElement);

        h('div', props);

        let newProps = createElement.mock.calls[0][1];

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

        h('div', {
            $update,
            foo: 'bar2'
        });

        newProps = createElement.mock.calls[1][1];

        newProps.ref(null);
        newProps.ref(el);

        expect($update).toHaveBeenCalledTimes(2);
        expect($update.mock.calls[1][0]).toBe(el);
        expect($update.mock.calls[1][1]).toMatchObject({
            foo: 'bar2'
        });
    });
});