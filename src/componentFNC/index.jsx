// import React from "react";
// import ReactDOM from "react-dom";
import React from "./component/react";
import ReactDOM from "./component/react-dom";
import "./index.css";

const FNCComponents = (props) => {
  return (<div>
    FNC组件
  <span style={{display:'block',color:'red'}}>{props.name}</span>
  <span style={{display:'block',color:'green'}}>{props.children}</span>
  </div>)
}
let e = <FNCComponents name={'test'}>函数组件</FNCComponents>// 这样写还是会走React自己的createElement
let ee = React.createElement(FNCComponents,{name:'test'},'函数组件')
console.log(e,ee)
ReactDOM.render(ee, document.getElementById("root"));

