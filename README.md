# react-change-props
Mutate(Change) React props, for each element in tree, and replace children.

[![npm](https://img.shields.io/npm/v/react-change-props.svg "Version")](https://www.npmjs.com/package/react-change-props)
[![Build Status](https://travis-ci.org/futurist/react-change-props.svg?branch=master)](https://travis-ci.org/futurist/react-change-props)

# Why?

In React, you cannot change `this.props` of any component,
but in case you want to?

# Install

```sh
npm install react-change-props -S
# or
yarn add react-change-props
```

# Usage

```jsx
import React from 'react'
import changeProps from 'react-change-props'

const replacer = str => (str && {className: 'my-prefix-' + str})
const newThing = changeProps(
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
// changeProps(JSX, [replacer])
var newJSX = changeProps(JSX, el => new_props_for_this_el)
```

If you `return { children: <Foo/> }` from above `replacer`, the children elements will be replaced.

The `return value` of `replacer` will be passed into `Object.assign({}, return_value)`, so if you return `Non-Object`, nothing happend.

# Notes

React only put `Object.freeze` when `process.env.NODE_ENV==='development'`, this lib will account the case of `development` and `production`.


