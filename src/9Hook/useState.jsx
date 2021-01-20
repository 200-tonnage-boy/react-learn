// function useState(initialState) {// 这种写法没法实现多个state
//   let state = lastState || (typeof initialState==='function'?initialState():initialState);
//   function setState(newState) {
//     if(typeof newState === 'function') {
//       newState = newState(lastState);
//     } 
//     if(!Object.is(lastState, newState)) {// 这里有问题
//       lastState = newState
//       render()
//     }
//   }
//   return [state, setState]
// }

import { PureComponent } from "react";

// 第二版
// 每次进入函数组件索引会清零，然后每使用一次hook+1
let hookState = []
let hookIndex = 0;

function useState (initialState) {// 没有实现传递进来函数的情况
  hookState[hookIndex] = hookState[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState (newState) {
    hookState[currentIndex] = newState;
    render();
  }
  return [hookState[hookIndex++], setState]
}


// let lastCallback, lastCallbackDeps;
// function useCallback (callback,deps) {
//   if(lastCallbackDeps){
//     let same = deps.every((item ,index) => item === lastCallbackDeps[index]);
//     if(!same) {
//       lastCallback = callback
//       lastCallbackDeps = deps
//     }
//   } else {
//     lastCallback = callback
//     lastCallbackDeps = deps
//   }
//   return lastCallback
// }

// 第二版 可以支持多个
function useCallback(callback, deps) {
  if(hookState[hookIndex]) {
    let [lastCallback, lastCallbackDeps] = hookState[hookIndex];
    let same = deps.every((item, index) => item === lastCallbackDeps[index])
    if(same) {
      return lastCallback
    } else {
      hookState[hookIndex++] = [callback,deps]
      return callback
    }
  } else {
    hookState[hookIndex++] = [callback. deps]
    return callback
  }

  hookState[hookIndex] = hookState[hookIndex] || [callback, deps];
  let [lastCallback, lastCallbackDeps] = hookState[hookIndex];
  if(lastCallback) {
    let same = deps.every((item, index) => item === lastCallbackDeps[index])
    if(!same) {
      hookState[hookIndex] = [callback, deps]
    }
  } else {
    hookState[hookIndex] = [callback,deps]
  }
  return hookState[hookIndex++][0]


}

let lastMemo, lastMemoDeps
function useCallback (callback,deps) {
  if(lastMemo){
    let same = deps.every((item, index) => item === lastMemoDeps[index])
    if(!same) {
      lastMemo = callback()
      lastMemoDeps = deps
    }
  } else {
    lastMemo = callback()
    lastMemoDeps = deps
  }
  return lastCallback
}


class PureComponent extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(Object.is(nextProps,this.props)&&Object.is(nextState, this.state))
  }
}
//React.memo
function memo(OldComponent) {
  return class extends React,PureComponent {
    render () {
      return <OldComponent />
    }
  }
}


let lastState;
function useReducer(reducer, initialState) {
  lastState = lastState || initialState
  function dispatch (action) {
    if(reducer) {
      lastState = reducer(lastState, action)
    } else {
      lastState = action
    }
    render()
  }
  return [lastState, dispatch]
}
// // useState其实是useReducer的语法糖
// function useState(initialState) {
//   return useReducer(null, initialState)
// }