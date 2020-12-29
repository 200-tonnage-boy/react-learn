import React from "react";
import ReactDOM from "react-dom";
// import React from "./5Ref/react";
// import ReactDOM from "./5Ref/react-dom";
import "./index.css";
// 测试函数组件使用ref转发

let ee = React.createElement("div", null, "test2");

ReactDOM.render(ee, document.getElementById("root"));

// setState 在事件处理函数,生命周期函数中是批量更新的
// 如果用函数作为参数，则可以拿到前一个setstate之后的值，但是函数是在setState之后执行的，只可以通过参数state拿前一个
// state的值，如果使用this.state获取的话就还是旧的
if (module.hot) {
  module.hot.accept();
}
