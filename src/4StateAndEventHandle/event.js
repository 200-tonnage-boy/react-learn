import updateQueue from './Component'
/**
 * 将所有事件统一放置到document上面，通过冒泡阶段进行事件的分发至指定的DOM上
 * 这种合成方式也导致没法进行冒泡，可以在dispatchEvent通过循环模拟冒泡
 * @param {*} dom 目标DOM
 * @param {*} eventType 事件类型 onclick onblur...
 * @param {*} handle 自定义的事件处理函数
 */
export function addEvent (dom, eventType, handle) {
  let store = dom.store || (dom.store={})
  store.eventType = handle
  document.addEventListener(eventType.slice(2),dispatchEvent,false)
}

// React的合成事件对象，为了可以复用及回收，以及屏蔽浏览器间的差异，兼容性处理；
let syntheticEvent = {}
/**
 * 
 * @param {*} e 原生事件对象
 */
function dispatchEvent (e) {
  let {target, type} = e
  let eventType = 'on' + type
  const {store} = target
  const handle = store&&store.eventType
  if(handle) {
    syntheticEvent.nativeEvent = e// 将原生的事件对象挂载到合成事件对象的一个属性上
    //这里可以给syntheticEvent添加属性
    for(let key in e) {
      syntheticEvent[key] = e[key]
    }
    updateQueue.isBatchingUpdate = true;// 事件处理函数中是批量更新模式
    handle(syntheticEvent)
    updateQueue.batchUpdate()// 执行完事件处理函数后进行批量更新

    // 此处也可以通过循环触发parentNode来模拟实现冒泡
    // 用完之后进行回收，也就是全局共享一个合成事件对象，这也就会造成
    // 事件处理函数中的异步代码是不能访问到事件对象的，可以使用`e.persit()`进行持久化
    // 在React17中不再使用合成对象池；
    for (let key in syntheticEvent) {
      syntheticEvent[key] = null
    }
  }
}