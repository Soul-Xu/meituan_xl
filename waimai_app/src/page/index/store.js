import { createStore, applyMiddleware } from 'redux';

import mainReducer from './reducers/main.js';

import thunk from 'redux-thunk';

// history和react-router结合使用
import { routerMiddleware } from 'react-router-redux'

// // history存储的就是页面push进去的路由
// import createHistory from 'history/createHashHistory'

// // 创建基于hash的history
// const history = createHistory()

const createHistory = require("history").createHashHistory

const history = createHistory()

// 创建初始化tab
history.replace('home');

// 创建history的middleware
const historyMiddl = routerMiddleware(history)

const store = createStore(mainReducer, applyMiddleware(thunk, historyMiddl));

if (module.hot) {
  module.hot.accept('./reducers/main', () => {
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer)
  });
}

module.exports = {
  store,
  history
}
// export default store