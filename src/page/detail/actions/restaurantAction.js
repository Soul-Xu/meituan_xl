import { 
  RESTAURANT_DATA
 } from './actionTypes'
import axios from 'axios'

export const getRestaurantData = () => async (dispatch) => {
  let resp = await axios({
    method: 'get',
    url: '/json/restaurant.json'
  })

  dispatch({
    type: RESTAURANT_DATA,
    obj: resp.data
  })
}
