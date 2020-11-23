function render (VDom, parentDom) {
  let dom = createDom(VDom)// 通过虚拟DOM生成真实DOM，
  parentDom.appendChild(dom)// 挂载到父节点上
}

/**
 * 把虚拟DOM 转换为真实DOM，并插入到页面
 */
function createDom (vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  let {type, props} = vdom

  let dom = document.createElement(type)
  updateProps(dom, props)
  if(typeof props.children==='string' || typeof props.children === 'number') {

  }
  reconcileChildren(props.children, dom)
  return dom
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