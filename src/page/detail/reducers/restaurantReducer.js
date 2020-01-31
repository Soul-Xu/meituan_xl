import { RESTAURANT_DATA } from '../actions/actionTypes.js'

const initState = {
  resData: {}
}

const getData = (state, action) => {
  return {...state, resData: action.obj.data}
}

const restaurantReducer = (state = initState, action) => {
  switch(action.type) {
    case RESTAURANT_DATA: return getData(state, action);
    default: return state;
  }
}

export default restaurantReducer