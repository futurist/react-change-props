import React from 'react';

import test from 'ava'
import TestRenderer from 'react-test-renderer'

import lib from '../'

// NOTICE: React not support Nested Component of props.children
// Below <Foo/> will have props.children === undefined
// thus CANNOT used with this lib, so we don't test it.
class Foo extends React.Component {
  render(){
    return (<Bar className="abc"/>)
  }
}
class Bar extends React.Component {
  render(){
    return lib(<div>
      {false}
      oiajweofj
      <p className="abc"><span>osdifj</span></p></div>
      , el=>(el.type=='p' && {className:'asdf'})
    )
  }
}

test('changed className', t => {
  const wrapper = TestRenderer.create( lib(<Bar />) )
	t.is(wrapper.root.findAll(v=>{
    return v.props.className=='asdf'
  }).length, 1)
})
