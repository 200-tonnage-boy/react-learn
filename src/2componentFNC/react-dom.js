function render (VDom, parentDom) {
  console.log('myrender')
  let dom = createDom(VDom)// 通过虚拟DOM生成真实DOM，
  // console.log(dom)
  parentDom.appendChild(dom)// 挂载到父节点上
}

/**
 * 把虚拟DOM 转换为真实DOM，并插入到页面
 */
function createDom (vdom) {
  // 布尔值JSX不会渲染，Array.length这种会渲染，因此不能用于条件渲染，都会输出到页面
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  let {type, props} = vdom
  let dom
  // 函数组件type为函数
  if (typeof type ==='function') {// 函数组件
    return undateFunctionComponent(vdom)
  } else {
    dom = document.createElement(type)
  }

  updateProps(dom, props)// 更新DOM属性，class  行内样式等等
  if(typeof props.children==='string' || typeof props.children === 'number') {
    dom.textContent = props.children
  }else if (typeof props.children == 'object'&& props.children.type){// 单个react子元素
    render(props.children, dom)
  }else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children?props.children.toString():''
  }
  return dom
}

function undateFunctionComponent(vdom) {
  const {type,props} = vdom
  const funVdom = type(props)// 函数组件返回的虚拟DOM
  return createDom(funVdom)
}

/**
 * 把props中的属性挂载到dom
 * @param {*} dom  真实dom
 * @param {*} props 属性
 */ 
function updateProps (dom, props) {
  for (let key in props) {
    if(key === 'style') {
      let style = props[key]
      for(let attr in style) {
        dom.style[attr] = style[attr]
      }
    } else if (key === 'children'){continue}
    else {
      // dom是通过document.creatElement创建，返回值是一个对象，
      // 对象的属性就是ClassName代表实际DOM的class，因此这里可以直接赋值
      dom[key] = props[key]
    }
  }
}

/**
 * 处理儿子
 * @param {*} children props中的儿子
 * @param {*} parentDOM 父元素dom
 */
function reconcileChildren (children, parentDOM) {
  for (let i=0; i<children.length; i++) {
    render(children[i], parentDOM)
  }
}

export default {
  render
}