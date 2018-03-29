import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import '../src/patch';

const h = React.createElement;

class Demo1 extends React.Component {
    state = {
        cnt: 0
    };

    render () {
        return h('div', {
            $attach: action('$attach'),
            $update: action('$update'),
            $detach: action('$detach'),
            cnt: this.state.cnt,
            onClick: () => this.setState({cnt: this.state.cnt + 1})
        },
            'Count: ' + this.state.cnt
        );
    }
}

storiesOf('Test', module)
    .add('No life-cycles', () => h('div', {}, 'No life-cycles'))
    .add('Life-cycles', () => h('div', {$attach: action('$attach'), $update: action('$update'), $detach: action('$detach')}, 'Life-cycles'))
    .add('Updating', () => h(Demo1))
