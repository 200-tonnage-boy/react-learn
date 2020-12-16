// 导出变量，用于判断是否处于批量更新模式
export let updateQueue = {
  updaters:[],// 更新器数组，里面是updater实例，而updater实例上面又挂载了组件实例；
  isBatchingUpdate: false,// 是否处于批量更新模式
  add (updater) {
    this.updaters.push(updater)
  },

  // 批量更新
  batchUpdate () {
    this.isBatchingUpdate = true
    // 循环缓存的updater，并调用其updateCompontent方法更新该updater对应的组件实例
    this.updaters.forEach(updater => updater.updateComponent())
    this.updaters.length = 0
    this.isBatchingUpdate = false// 循环执行完不在批量更新模式下
  }
}

class Updater {
  constructor (instance) {// 组件实例，创建类组件的时候会初始化一个Updater，并传入组件实例this
    this.instance = instance
    this.pendingState = []
  }
  addState(partialState) {
    // 先对setState传进来的对象或者函数进行缓存，
    this.pendingState.push(partialState)
    // 判断当前是否处于批量更新的状态，如果处于的话就缓存，不处于的话就直接更新组件
    updateQueue.isBatchingUpdate?updateQueue.add(this):this.updateComponent()
  }
  updateComponent () {

  }
}

// 类组件的实现基类 Name extends React.Component
class Component {
  constructor (props) {
    this.props = props// 解释了在类组件中super（props）其实就是往this上挂载props，
    //如果不写constructor会自动补全，写了constructor则必须写super()
    this.state = {}
    this.$updater = new Updater(this)
  }
  /**
   * 
   * @param {*} partialState 部分state，因为在setstate的时候可能传入的是部分新增state，setState会进行合并
   * 另外还可能会传入函数
   */
  setState (partialState) {
    this.$updater.addState(partialState)
  }
  // class的本质也是函数，添加该属性用于根据type鉴别是函数组件还是类组件
  static isReactComponent = {}
}

export default Component
