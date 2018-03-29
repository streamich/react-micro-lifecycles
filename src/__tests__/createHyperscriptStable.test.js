import React from 'react';
import {mount} from 'enzyme';
import createHyperscriptStable from '../createHyperscriptStable';

describe('createHyperscriptStable()', () => {
    it('exists', () => {
        expect(typeof createHyperscriptStable).toBe('function');
    });

    it('returns a function', () => {
        const h = createHyperscriptStable(React.createElement, React.Component);

        expect(typeof h).toBe('function');
    });

    it('can render <div>', () => {
        const h = createHyperscriptStable(React.createElement, React.Component);
        const wrapper = mount(h('div', {}, 'Hello'));
    });

    it('calls $attach on mount', () => {
        const h = createHyperscriptStable(React.createElement, React.Component);
        const $attach = jest.fn();
        const wrapper = mount(h('div', {$attach, foo: 'bar'}, 'Hello'));

        expect($attach).toHaveBeenCalledTimes(1);
        expect(typeof $attach.mock.calls[0][0]).toBe('object');
        expect($attach.mock.calls[0][1]).toMatchObject({
            foo: 'bar'
        });
        expect($attach.mock.calls[0][2]).toBe(undefined);
    });

    it('calls $update on re-renders', () => {
        const h = createHyperscriptStable(React.createElement, React.Component);
        const $attach = jest.fn();
        const $update = jest.fn();
        const wrapper = mount(h('div', {$attach, $update, foo: 'bar'}, 'Hello'));

        expect($attach).toHaveBeenCalledTimes(1);
        expect(typeof $attach.mock.calls[0][0]).toBe('object');
        expect($attach.mock.calls[0][1]).toMatchObject({
            foo: 'bar'
        });
        expect($attach.mock.calls[0][2]).toBe(undefined);
        expect($update).toHaveBeenCalledTimes(0);

        wrapper.setProps({foo: 'bar2'}); 

        expect($attach).toHaveBeenCalledTimes(1);
        expect($update).toHaveBeenCalledTimes(1);
        expect(typeof $update.mock.calls[0][0]).toBe('object');
        expect($update.mock.calls[0][1]).toMatchObject({
            foo: 'bar2'
        });
        expect($update.mock.calls[0][2]).toMatchObject({
            foo: 'bar'
        });
        expect($update.mock.calls[0][3]).toBe(undefined);

        wrapper.setProps({foo: 'bar3'}); 

        expect($attach).toHaveBeenCalledTimes(1);
        expect($update).toHaveBeenCalledTimes(2);
        expect(typeof $update.mock.calls[1][0]).toBe('object');
        expect($update.mock.calls[1][1]).toMatchObject({
            foo: 'bar3'
        });
        expect($update.mock.calls[1][2]).toMatchObject({
            foo: 'bar2'
        });
        expect($update.mock.calls[1][3]).toBe(undefined);
    });

    it('calls $detach on un-mount', () => {
        const h = createHyperscriptStable(React.createElement, React.Component);
        const $detach = jest.fn();
        const wrapper = mount(h('div', {$detach, foo: 'bar'}, 'Hello'));

        expect($detach).toHaveBeenCalledTimes(0);
        
        wrapper.unmount();

        expect($detach).toHaveBeenCalledTimes(1);
        expect(typeof $detach.mock.calls[0][0]).toBe('object');
        expect($detach.mock.calls[0][1]).toMatchObject({
            foo: 'bar'
        });
        expect($detach.mock.calls[0][2]).toBe(undefined);
    });
});
