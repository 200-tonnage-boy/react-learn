// import React from "react";
// import ReactDOM from "react-dom";
import React from "./5Ref/react";
import ReactDOM from "./5Ref/react-dom";
import "./index.css";
/**
 * 此时已经可以实现原生DOM的ref
 */
// class ClassComponents extends React.Component  {
//   constructor (props) {
//     super(props)
//     this.a = React.createRef()
//     this.b = React.createRef()
//     this.num = React.createRef()
//   }
//   handle = () =>{
//     this.num.current.value = this.a.current.value + this.b.current.value
//   }
//   render () {
//     let input1 = React.createElement('input',{ref:this.a})
//     let input2 = React.createElement('input',{ref:this.b})
//     let input3 = React.createElement('input',{ref:this.num})
//     let btn = React.createElement('button', {onClick: this.handle},'求和')
//     return React.createElement('div',null,input1,input2,btn, input3)
//   }
// }

// 测试类组件使用ref
// class MyInput extends React.Component {
//   constructor (props) {
//     super(props)
//     this.input = React.createRef()
//   }
//   getFocus = () => {// 给原生的Input框获取焦点
//     this.input.current.focus()
//   }
//   render () {
//     return React.createElement('input',{
//       ref:this.input
//     })
//   }
// }
// class FormCom extends React.Component  {
//   constructor (props) {
//     super(props)
//     this.son = React.createRef()
//   }
//   handle = () =>{
//     this.son.current.getFocus()
//   }
//   render () {
//     let input1 = React.createElement(MyInput,{ref:this.son})
//     let btn = React.createElement('button', {onClick: this.handle},'获取焦点')
//     return React.createElement('div',null,input1,btn)
//   }
// }

// 测试函数组件使用ref转发
const Func = React.forwardRef((props, refs) => {
  return React.createElement("input", {
    ref: refs,
  });
});
class FormCom extends React.Component {
  constructor(props) {
    super(props);
    this.son = React.createRef();
  }
  handle = () => {
    console.log();
    this.son.current.focus();
  };
  render() {
    let input1 = React.createElement(Func, { ref: this.son });
    let btn = React.createElement(
      "button",
      { onClick: this.handle },
      "获取焦点"
    );
    return React.createElement("div", null, input1, btn);
  }
}

let ee = React.createElement(FormCom);

ReactDOM.render(ee, document.getElementById("root"));

// setState 在事件处理函数,生命周期函数中是批量更新的
// 如果用函数作为参数，则可以拿到前一个setstate之后的值，但是函数是在setState之后执行的，只可以通过参数state拿前一个
// state的值，如果使用this.state获取的话就还是旧的
