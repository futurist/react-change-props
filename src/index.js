import React from 'react'

const {isArray} = Array
const {assign} = Object


function cloneTree (element, cb) {
  var newProps, children
  return isArray(element)
    ? element.map(el => cloneTree(el, cb))
    : React.isValidElement(element)
      ? (
        newProps = element.props,
        React.cloneElement(
          element,
          typeof cb!=='function' ? null : assign({},
            newProps = cb(element) || newProps,
            (children = newProps.children || element.props.children)
            && {children: cloneTree(children, cb)}
          )
        )
      )
      : element
}

export default cloneTree


