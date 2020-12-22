import { Component } from "./Component";

function createElement(type, config, children) {
  // console.log("mycreateElement");
  if (config) {
    // 源代码里的 暂时无用
    delete config.__source;
    delete config.__self;
  }
  let props = { ...config }; // 组装props
  if (arguments.length > 3) {
    // 看有几个儿子，
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return {
    type,
    props,
  };
}

export default {
  createElement,
  Component,
};
