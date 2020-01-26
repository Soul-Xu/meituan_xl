import tabReducer from './tabReducer.js';
import categoryReducer from './categoryReducer.js'
import contentListReducer from './contentListReducer.js' 
import orderReducer from './orderReducer.js'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
// ConnectedRouter是将provider和router进行
// routerReducer相当于设置router的根结点的reducer,是跟store联合起来的

const reducers = combineReducers({
  tabReducer,
  categoryReducer,
  contentListReducer,
  orderReducer,
  router: routerReducer
});

export default reducers 