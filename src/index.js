// import React from "react";
// import ReactDOM from "react-dom";
import React from "./MyReact-vdom/react";
import ReactDOM from "./MyReact-vdom/react-dom";
import "./index.css";



let d = (
  <div style={{ backgroundColor: "red", height: "40px" }}>
    div<span style={{ color: "white" }}>测试</span>
  </div>
);
let dd = React.createElement(
  "div",
  { style: { backgroundColor: "red", height: "40px" }, className: 'test' },
  React.createElement("span",{style:{ color: "white" }},'测试')
);
// console.log('d',d,'dd',dd)
ReactDOM.render(dd, document.getElementById("root"));

