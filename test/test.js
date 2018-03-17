
var test = require('ava')
var TestRenderer = require('react-test-renderer')

var React = require('react')
var lib = require('../dist').default

// NOTICE: React not support Nested Component of props.children
// Below <Foo/> will have props.children === undefined
// thus CANNOT used with this lib, so we don't test it.
class Foo extends React.Component {
  render(){
    return (<Bar className="abc"/>)
  }
}
const JSX = <div>
  {false}
  oiajweofj
  <p className="abc"><span>osdifj</span></p></div>

class Bar extends React.Component {
  render(){
    const {props} = this
    return props.change
      ? lib(JSX, props.change)
      : JSX
  }
}

test('callback can be ignored', t => {
  TestRenderer.create( lib(<div><p></p></div>) )
  t.pass()
})


test('props replace', t => {
  const wrapper = TestRenderer.create( <Bar change={
    el=>(el.type=='p' && {className:'asdf'})
  } /> )
	t.is(wrapper.root.findAll(v=>{
    return v.props.className=='asdf'
  }).length, 1)
})

test('children replace', t => {
  const wrapper = TestRenderer.create( <Bar change={
    el=>(el.type=='p' && {children: <h1 />})
  } /> )
  // console.log( JSON.stringify(wrapper.toJSON() ))
	t.is(wrapper.root.findAll(v=>{
    return /^(p|h1)$/.test(v.type)
  }).length, 2)
})

test('prduction props replace', t => {
  // try to change to production build of React
  process.env.NODE_ENV = 'production'
  Object.keys(require.cache)
    .filter(v=>/react\//.test(v))
    .forEach(v=>delete require.cache[v])
  delete require.cache[require.resolve('../dist')]

  React = require('react')
  lib = require('../dist').default

  const wrapper = TestRenderer.create( <Bar change={
    el=>(el.type=='p' && {className:'asdf', children: <h1 />})
  } /> )
  // console.log( JSON.stringify(wrapper.toJSON() ))
	t.is(wrapper.root.findAll(v=>{
    return /^(p|h1)$/.test(v.type)
  }).length, 2)
  t.is(wrapper.root.findAll(v=>{
    return v.props.className=='asdf'
  }).length, 1)

})
