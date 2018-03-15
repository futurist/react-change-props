'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = Array.isArray;
var assign = Object.assign;


function cloneTree(element, cb) {
  var newProps, children;
  return isArray(element) ? element.map(function (el) {
    return cloneTree(el, cb);
  }) : _react2.default.isValidElement(element) ? (newProps = element.props, _react2.default.cloneElement(element, typeof cb !== 'function' ? null : assign({}, newProps = cb(element) || newProps, (children = newProps.children || element.props.children) && { children: cloneTree(children, cb) }))) : element;
}

exports.default = cloneTree;