import React from 'react'


const {isArray} = Array
const {isFrozen, assign} = Object

/** Try to Wrap Component Class, failed? */
// const isFunction = fn=>typeof fn==='function'
// const isClassType = (Component) => {
//   return 'prototype' in Component && isFunction(Component.prototype.render)
// }

// const wrapComponent = (Component) => {
//   const CSSObjComponent = isClassType(Component)
//   ? class extends Component {
//     render () {
//       const result = super.render()
//       return injectCSS(result)
//     }
//   }
//   : function (props) {
//     const result = Component.apply(this, arguments)
//     return injectCSS(result)
//   }
//   return assign(CSSObjComponent, Component)
// }

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


