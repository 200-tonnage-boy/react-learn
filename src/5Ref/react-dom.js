import { addEvent } from "./event";
function render(VDom, parentDom) {
  // console.log("myrender");
  let dom = createDom(VDom); // 通过虚拟DOM生成真实DOM，
  parentDom.appendChild(dom); // 挂载到父节点上
}

/**
 * 把虚拟DOM 转换为真实DOM
 */
function createDom(vdom) {
  // console.log('createDom')
  // 布尔值JSX不会渲染，Array.length这种会渲染，因此不能用于条件渲染，都会输出到页面-- 错误
  // 这里是为了处理子元素的问题，createElement第三个参数可能直接是个字符串
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }
  let { type, props, ref } = vdom;
  let dom;
  // 函数组件type为函数
  if (typeof type === "function") {
    // 函数组件 或者类组件
    return type.isReactComponent // 类组件添加了这个静态属性用于鉴别
      ? undateClassComponent(vdom)
      : undateFunctionComponent(vdom);
  } else {
    dom = document.createElement(type); // 终归会在这里创建dom，所以在这里处理ref
  }

  updateProps(dom, props); // 更新DOM属性，class  行内样式等等
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    dom.textContent = props.children;
  } else if (typeof props.children == "object" && props.children.type) {
    // 单个react子元素
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : "";
  }
  if (ref) {
    ref.current = dom; // 这种实现只能模拟React.creatRef, 该API是将目标元素挂载至current上的；
  }
  return dom;
}
/**
 * 更新函数组件：根据type判断进入，返回一个真实的DOM对象
 * @param {*} vdom 虚拟dom
 */
function undateFunctionComponent(vdom) {
  const { type, props } = vdom;
  const funVdom = type(props); // 函数组件返回的虚拟DOM
  return createDom(funVdom);
}

/**
 * 更新类组件：返回真实的DOM对象
 * @param {*} vdom 虚拟DOM
 */
function undateClassComponent(vdom) {
  const { type: classComponents, props, ref } = vdom; // 给type起个别名，type就是class本身
  const classVDOMInstance = new classComponents(props); // 实例化
  if (ref) {
    ref.current = classVDOMInstance;
  }
  const classVDOM = classVDOMInstance.render(); // 调用render方法
  // console.log('test class render', classVDOM)
  const dom = createDom(classVDOM);
  classVDOMInstance.dom = dom; // 类组件生成的实例上
  return dom;
}

/**
 * 把props中的属性挂载到dom
 * @param {*} dom  真实dom
 * @param {*} props 属性
 */
function updateProps(dom, props) {
  for (let key in props) {
    if (key === "style") {
      let style = props[key];
      for (let attr in style) {
        dom.style[attr] = style[attr];
      }
    } else if (key === "children") {
      continue;
    } else if (key.startsWith("on")) {
      // 绑定事件
      addEvent(dom, key.toLocaleLowerCase(), props[key]);
    } else {
      // dom是通过document.creatElement创建，返回值是一个对象，
      // 对象的属性就是ClassName代表实际DOM的class，因此这里可以直接赋值
      dom[key] = props[key];
    }
  }
}

/**
 * 处理儿子
 * @param {*} children props中的儿子
 * @param {*} parentDOM 父元素dom
 */
function reconcileChildren(children, parentDOM) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDOM);
  }
}

export default {
  render,
  createDom,
};
