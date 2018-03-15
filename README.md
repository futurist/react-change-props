# react-clone-tree
Clone React Element Tree, allow you change props for each tree element, and replace children.

# Install

```sh
npm install react-clone-tree
# or
yarn add react-clone-tree
```

# Usage

```jsx
const clone = require('react-clone-tree')
const newThing = clone(
  <div className="a"><p className="b"><span>text</span></p></div>,
  el=>(el.props.className && {className: 'my-prefix-' + el.props.className})
)
```

The `newThing` will be:

```jsx
<div className="my-prefix-a"><p className="my-prefix-b"><span>text</span></p></div>
```

The API is easy:

```js
// clone(JSX, [callback])
var newJSX = clone(JSX, el => new_props_for_this_el)
```

If you `return { children: <Foo/> }` from above `callback`, the children elements will be replaced.

