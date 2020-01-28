// import tabReducer from './tabReducer.js';
// import categoryReducer from './categoryReducer.js'
// import contentListReducer from './contentListReducer.js' 
// import orderReducer from './orderReducer.js'
import { combineReducers } from 'redux';
import headerReducer from './headerReducer.js'
import contentListReducer from './contentListReducer.js'

const reducers = combineReducers({
  headerReducer,
  contentListReducer
});

export default reducers 