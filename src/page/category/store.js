import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// 记录store中state变化的中间件 logger
import logger from 'redux-logger'
import mainReducer from './reducers/main.js'
const store = createStore(mainReducer, applyMiddleware(thunk, logger))

export default store