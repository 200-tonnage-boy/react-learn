import React from "react";
import ReactDOM from "react-dom";
// import React from "./MyReact/react";
// import ReactDOM from "./MyReact/react-dom";
import "./index.css";
import App from "./App";
import PropTypes from 'prop-types';
class A extends React.Component {
  constructor (props) {
    super(props)
  }
  static defaultProps =  {
    test: '1'
  }
   static propTypes = {
     test: PropTypes.number
   }
  render () {
    return <>
      {this.props.test}
    </>
  }
}

ReactDOM.render(<A test='ss'/>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
