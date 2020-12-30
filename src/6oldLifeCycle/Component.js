import ReactDOM from "./react-dom.js";
const { createDom } = ReactDOM;
// 导出变量，用于判断是否处于批量更新模式
export let updateQueue = {
  updaters: [], // 更新器数组，里面是updater实例，而updater实例上面又挂载了组件实例；
  isBatchingUpdate: false, // 是否处于批量更新模式
  add(updater) {
    this.updaters.push(updater);
  },

  // 批量更新
  batchUpdate() {
    this.isBatchingUpdate = true;
    // 循环缓存的updater，并调用其updateCompontent方法更新该updater对应的组件实例
    this.updaters.forEach((updater) => updater.updateComponent());
    this.updaters.length = 0;
    this.isBatchingUpdate = false; // 循环执行完不在批量更新模式下
  },
};

class Updater {
  constructor(instance) {
    // 组件实例，创建类组件的时候会初始化一个Updater，并传入组件实例this
    this.classInstance = instance;
    this.pendingState = [];
  }
  addState(partialState) {
    // 先对setState传进来的对象或者函数进行缓存，
    this.pendingState.push(partialState);
    this.emitUpdate();

    // 有了上面emitUpdate函数下面逻辑干掉
    // 判断当前是否处于批量更新的状态，如果处于的话就缓存，不处于的话就直接更新组件
    // updateQueue.isBatchingUpdate
    //   ? updateQueue.add(this)
    //   : this.updateComponent();
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (this.componentWillReceiveProps) {
      // TODO 这里是不是和下面的forceUpdate有重复？？？
      // 生命周期钩子  注意顺序
      this.componentWillReceiveProps(this.props); // 上面的代码中已经更新过props
    }
    // 如果有了新的props过来，或者当前没有处于批量更新模式，则直接更新组件，添加了一个props是否更新的判断
    if (this.nextProps || !updateQueue.batchUpdate) {
      this.updateComponent();
    } else {
      updateQueue.add(this);
    }
  }
  updateComponent() {
    let { classInstance, pendingState, nextProps } = this;
    // 添加nextProps的判断，也就是有新的props传入或者有pendingstate的情况下才能真正更新；
    if (pendingState.length > 0 || nextProps) {
      // 此处先获取新的状态：this.getState()
      shouldUpdate(classInstance, nextProps, this.getState());
      // // 有新增缓存的state
      // classInstance.state = this.getState(); // class组件的state是进行合并，可能传递进来的是函数，需要单独处理
      // classInstance.forceUpdate(); // 更新完state后重新渲染
    }
  }

  getState() {
    let { classInstance, pendingState } = this;
    let { state } = classInstance; // 组件当前的state
    // debugger
    let newStete = pendingState.reduce((accumulator, currentValue) => {
      if (typeof currentValue === "function") {
        return { ...accumulator, ...currentValue(accumulator) };
      } else {
        // 不是函数就是对象，暂时不考虑其他情况
        return { ...accumulator, ...currentValue };
      }
    }, state);
    pendingState.length = 0;
    // console.log('新的state',newStete)
    return newStete;
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  // 这说明shouldComponentUpdate只是控制组件是否重新渲染，
  // 但是props和state都已经更新为最新的值
  classInstance.props = nextProps || classInstance.props;
  classInstance.state = nextState || classInstance.state;

  // shouldComponentUpdate生命周期钩子返回值为false则不更新
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(nextProps, nextState)
  ) {
    return;
  }
  // 不满足上面情况：没有定义shouldComponentUpdate，或者返回值为true则更新组件
  classInstance.forceUpdate();
}

// 类组件的实现基类 Name extends React.Component
export class Component {
  constructor(props) {
    this.props = props; // 解释了在类组件中super（props）其实就是往this上挂载props，
    //如果不写constructor会自动补全，写了constructor则必须写super()
    this.state = {};
    this.$updater = new Updater(this);
  }
  /**
   *
   * @param {*} partialState 部分state，因为在setstate的时候可能传入的是部分新增state，setState会进行合并
   * 另外还可能会传入函数
   */
  setState(partialState) {
    // console.log('my setState')
    this.$updater.addState(partialState);
  }

  forceUpdate() {
    // if (this.componentWillReceiveProps) { 提升到上面去写
    //   // 生命周期钩子  注意顺序
    //   this.componentWillReceiveProps(this.props); // 上面的代码中已经更新过props
    // }
    // 改造：加入willUpdate和DidUpdate的判断和调用
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    let newVDOM = this.render(); // 新的虚拟DOM
    // 这里会有dom-diff，没有的组件会调用unmount钩子
    let newDom = createDom(newVDOM); // 新的真实DOM
    let oldDom = this.dom; // 老的真实DOM// 在react-dom 里面的undateClassComponent函数中挂载的
    this.dom = newDom;
    oldDom.parentNode.replaceChild(newDom, oldDom); // 替换真实DOM

    if (this.componentDidUpdate) {
      // render之后调用
      this.componentDidUpdate();
    }
  }

  // class的本质也是函数，添加该属性用于根据type鉴别是函数组件还是类组件
  static isReactComponent = {};
}

// export Component
