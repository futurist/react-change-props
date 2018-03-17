import React from 'react'

const {isArray} = Array
const {isFrozen, assign} = Object

const assignProps = (element, cb)=>{
  var children
  var newProps = element.props
  return !cb ? null : assign({},
    newProps = cb(element) || newProps,
    (children = newProps.children || element.props.children)
    && {children: cloneTree(children, cb)}
  )
}

function cloneTree (element, cb) {
  return isArray(element)
    ? element.map(el => cloneTree(el, cb))
    : React.isValidElement(element)
      ? (
        isFrozen && isFrozen(element.props)
        ? React.cloneElement(
          element,
          assignProps(element, cb)
        )
        : (
          assign(element.props, assignProps(element, cb)),
          element
        )
      )
      : element
}

export default cloneTree


