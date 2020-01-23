import { LIST_DATA  } from './actionTypes.js';
import axios from 'axios';

export const getListData = () => (dispatch) => {
  axios({
    method: 'get',
    url: '/json/homelist.json'
  }).then((resp) => {
    dispatch({
      type: LIST_DATA,
      obj: resp.data
    })
  })
}