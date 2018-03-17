# react-change-props
Mutate(Change) React props, for each element in tree, and replace children.

[![npm](https://img.shields.io/npm/v/react-clone-tree.svg "Version")](https://www.npmjs.com/package/react-clone-tree)
[![Build Status](https://travis-ci.org/futurist/react-clone-tree.svg?branch=master)](https://travis-ci.org/futurist/react-clone-tree)


# Install

```sh
npm install react-clone-tree
# or
yarn add react-clone-tree
```

# Usage

```jsx
import React from 'react'
import clone from 'react-clone-tree'

const replacer = str => (str && {className: 'my-prefix-' + str})
const newThing = clone(
  <div className="a"><p className="b"><span>text</span></p></div>,
  el => replacer(el.props.className)
)
```

The `newThing` will be:

```jsx
<div className="my-prefix-a"><p className="my-prefix-b"><span>text</span></p></div>
```

The API is easy:

```js
// clone(JSX, [replacer])
var newJSX = clone(JSX, el => new_props_for_this_el)
```

If you `return { children: <Foo/> }` from above `replacer`, the children elements will be replaced.

The `return_val` of `replacer` will be passed into `Object.assign({}, return_val)`, so if you return `Non-Object`, nothing happend.

