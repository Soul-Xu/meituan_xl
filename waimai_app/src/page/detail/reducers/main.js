import tabReducer from './tabReducer.js';
import menuReducer from './menuReducer.js'
import commentReducer from './commentReducer.js'
import restaurantReducer from './restaurantReducer'
import { combineReducers } from 'redux';

const reducers = combineReducers({
  tabReducer,
  menuReducer,
  commentReducer,
  restaurantReducer
});

export default reducers