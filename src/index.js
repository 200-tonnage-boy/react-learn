import React from "react";
import ReactDOM from "react-dom";
// import React from "./3componentClass/react";
// import ReactDOM from "./3componentClass/react-dom";
import "./index.css";

class ClassComponents extends React.Component  {
  constructor (props) {
    super(props)
    this.state = {
      num: 1
    }
  }
  handleClick = () => {
    this.setState({num: this.state.num+1})
    console.log('1',this.state.num)
    
    this.setState({num: this.state.num+1})
    console.log('2',this.state.num)
    
    this.setState({num: 4})
    console.log('3',this.state.num)

    this.setState((state) => {
      console.log('4',state.num, this.state.num)
      return {num: state.num+1}
    })
    console.log('5',this.state.num)
    
    this.setState({num: this.state.num+1})
    console.log('6',this.state.num)
    
    this.setState((state) => {
      console.log('7',state.num, this.state.num)
      return {num: 5}
    })
    console.log('8',this.state.num)
    
    this.setState({num: this.state.num+1})
    console.log('9',this.state.num)

    this.setState((state) => {
      console.log('10',state.num, this.state.num)
      return {num: state.num+1}
    })

    setTimeout(()=>{
    console.log('11',this.state.num)
    this.setState({num: this.state.num+1})
    console.log('12',this.state.num)

    this.setState({num: this.state.num+1})
    console.log('13',this.state.num)
    
    this.setState((state) => {
      console.log('14',state.num, this.state.num)
      return {num: state.num+1}
    })
    console.log('15',this.state.num)
    
    this.setState({num: 10})
    console.log('16',this.state.num)
    this.setState((state) => {
      console.log('17',state.num, this.state.num)
      return {num: state.num+1}
    })
    console.log('18',this.state.num)
    this.setState({num: this.state.num+1})
    console.log('19',this.state.num)
    },2000)
  }

  componentDidMount () {
    this.setState({num: this.state.num+1})
    this.setState({num: this.state.num+1})
    this.setState({num: this.state.num+1})
  }
  render () {
    return <>
    {this.state.num}
    <button onClick={this.handleClick}>+1</button>
    </>
  }
}
let e = <ClassComponents name={'test'}>类组件</ClassComponents>// 这样写还是会走React自己的createElement
let ee = React.createElement(ClassComponents,{name:'test'},'类组件')
console.log(e,ee)
ReactDOM.render(e, document.getElementById("root"));

// setState 在事件处理函数,生命周期函数中是批量更新的
// 如果用函数作为参数，则可以拿到前一个setstate之后的值，但是函数是在setState之后执行的，只可以通过参数state拿前一个
// state的值，如果使用this.state获取的话就还是旧的