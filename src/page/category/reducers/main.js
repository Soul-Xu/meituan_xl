// import tabReducer from './tabReducer.js';
// import categoryReducer from './categoryReducer.js'
// import contentListReducer from './contentListReducer.js' 
// import orderReducer from './orderReducer.js'
import { combineReducers } from 'redux';
import headerReducer from './headerReducer.js'

const reducers = combineReducers({
  headerReducer
});

export default reducers 