'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = Array.isArray;
var isFrozen = Object.isFrozen,
    assign = Object.assign;


var assignProps = function assignProps(element, cb) {
  var children;
  var newProps = element.props;
  return !cb ? null : assign({}, newProps = cb(element) || newProps, (children = newProps.children || element.props.children) && { children: cloneTree(children, cb) });
};

function cloneTree(element, cb) {
  return isArray(element) ? element.map(function (el) {
    return cloneTree(el, cb);
  }) : _react2.default.isValidElement(element) ? isFrozen && isFrozen(element.props) ? _react2.default.cloneElement(element, assignProps(element, cb)) : (assign(element.props, assignProps(element, cb)), element) : element;
}

exports.default = cloneTree;