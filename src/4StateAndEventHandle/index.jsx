// import React from "react";
// import ReactDOM from "react-dom";

import React from "./3componentClass/react";
import ReactDOM from "./3componentClass/react-dom";
import "./index.css";

class ClassComponents extends React.Component {
  render() {
    return (
      <div>
        FNC组件
        <span style={{ display: "block", color: "red" }}>
          {this.props.name}
        </span>
        <span style={{ display: "block", color: "green" }}>
          {this.props.children}
        </span>
      </div>
    );
  }
}
let e = <ClassComponents name={"test"}>类组件</ClassComponents>; // 这样写还是会走React自己的createElement
let ee = React.createElement(ClassComponents, { name: "test" }, "类组件");
console.log(e, ee);
ReactDOM.render(ee, document.getElementById("root"));
