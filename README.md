# react-micro-lifecycles

DOM element life-cycles for JSX.


```jsx
<div
  $attach={(el, props) => console.log('element attached: ', el, props)}
  $update={(el, props, oldProps) => console.log('element updated: ', el, props, oldProps)}
  $detach={(el, oldProps) => console.log('element detached: ', el, oldProps)}
/>
```
