// 类组件的实现基类 Name extends React.Component
class Component {
  constructor (props) {
    this.props = props// 解释了在类组件中super（props）其实就是往this上挂载props，
    //如果不写constructor会自动补全，写了constructor则必须写super()
  }

  // class的本质也是函数，添加该属性用于根据type鉴别是函数组件还是类组件
  static isReactComponent = {}
}

export default Component
