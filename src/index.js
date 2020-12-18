// import React from "react";
// import ReactDOM from "react-dom";
import React from "./4StateAndEventHandle/react";
import ReactDOM from "./4StateAndEventHandle/react-dom";
import "./index.css";

class ClassComponents extends React.Component  {
  constructor (props) {
    super(props)
    this.state = {
      num: 1
    }
  }
  handleClickDiv = (e) => {
   console.log('div')
  }

  handleClickBtn = (e) => {
    console.log('Btn')
    console.log(e)
    this.setState({num: this.state.num+1})
    this.setState({num: this.state.num+1})
    this.setState({num: this.state.num+1})
    this.setState({num: this.state.num+1})
    setTimeout(() => {
      this.setState({num: this.state.num+1})
      this.setState({num: this.state.num+1})
    }, 0);
   }

  componentDidMount () {
    
  }
  render () {
  // 如果直接写JSX  还是会被编译并使用原生的React.crea
  //   return(<div style={{height:'300px',width:'300px',backgroundColor:'pink'}} onClick={this.handleClickDiv}>
  //   <span>外层盒子</span>
  //   <button onClick={this.handleClickBtn}>合成事件</button>
  // </div>)

  let s = React.createElement('span',{},`外层盒子${this.state.num}`)
  let btn = React.createElement('button',{onClick:this.handleClickBtn},'合成事件')
  return React.createElement('div',{style:{height:'300px',width:'300px',backgroundColor:'pink'},onClick:this.handleClickDiv},s,btn)
  }
}
//let e = <ClassComponents name={'test'}></ClassComponents>// 这样写还是会走React自己的createElement
let ee = React.createElement(ClassComponents)
//console.log(e,ee)
ReactDOM.render(ee, document.getElementById("root"));

// setState 在事件处理函数,生命周期函数中是批量更新的
// 如果用函数作为参数，则可以拿到前一个setstate之后的值，但是函数是在setState之后执行的，只可以通过参数state拿前一个
// state的值，如果使用this.state获取的话就还是旧的