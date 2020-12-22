import React from "react";
import ReactDOM from "react-dom";

// import React from "react";
// import ReactDOM from "react-dom";
import React from "./MyReact-vdom/react";
import ReactDOM from "./MyReact-vdom/react-dom";
// import "./index.css";

// import PropTypes from 'prop-types';
// class A extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//   static defaultProps =  {
//     test: '1'
//   }
//    static propTypes = {
//      test: PropTypes.number
//    }
//   render () {
//     return <>
//       {this.props.test}
//     </>
//   }
// }
let d = (
  <div style={{ backgroundColor: "red", height: "40px" }}>
    div<span style={{ color: "white" }}>测试</span>
  </div>
);
let dd = React.createElement(
  "div",
  { style: { backgroundColor: "red", height: "40px" } },
  "div",
  React.createElement("span", { style: { color: "white" } }, "测试")
);
console.log("d", d, "dd", dd);
ReactDOM.render(dd, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
