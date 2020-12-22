import { Component } from "./Component";

function createElement(type, config, children) {
  // console.log("mycreateElement");
  let ref;
  if (config) {
    // 源代码里的 暂时无用
    delete config.__source;
    delete config.__self;
    ref = config.ref; // 这里与源码里面不一致，源码里面config的ref应该是置空的
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
    ref, // // ref是单独处理的  并不属于props
  };
}

function createRef() {
  return {
    // 原生里面也是返回一个空对象
    current: null,
  };
}

function forwardRef(fnc) {
  // 这里的实现与源码不一致，源码是返回一个对象，如下所示：通过$$typeof标定元素类型，
  // const elementType = {
  //   $$typeof: REACT_FORWARD_REF_TYPE,
  //   render,
  // };
  return class extends Component {
    render() {
      return fnc(this.props, this.props.ref); // 这里是因为在createElement里面没有删除ref所以这里可以使用
      // 真实的源码里面props里面的ref是为空的
    }
  };
}

export default {
  createElement,
  Component,
  createRef,
  forwardRef,
};
