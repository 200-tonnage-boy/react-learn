function render (VDom, parentDom) {
  let dom = createDom(VDom)// 通过虚拟DOM生成真实DOM，
  parentDom.appendChild(dom)// 挂载到父节点上
}