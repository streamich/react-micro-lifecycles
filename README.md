# react-micro-lifecycles

Use micro-life-cycles:

```jsx
<div
  $attach={(el, props) => console.log('element attached: ', el, props)}
  $update={(el, props, oldProps) => console.log('element updated: ', el, props, oldProps)}
  $detach={(el, oldProps) => console.log('element detached: ', el, oldProps)}
/>
```

Installation:

```js
require('react-micro-lifecycles/lib/patchStable');
```

or

```js
require('react-micro-lifecycles/lib/patchUnstable');
```

`patchStable` uses React stateful components, `patchUnstable` does not use React stateful components &mdash;
it uses only `ref` prop.
