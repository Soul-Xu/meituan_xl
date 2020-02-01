import { LIST_DATA  } from './actionTypes.js';
import { CHANGEREADYSTATE } from 'component/ScrollView/scrollViewActionsTypes.js'

import axios from 'axios';

export const getListData = (page) => (dispatch) => {
  dispatch({
    type: CHANGEREADYSTATE,
    obj: false
  })
  
  axios({
    method: 'get',
    url: '/json/homelist.json'
  }).then((resp) => {
    window.setTimeout(() => {
      dispatch({
        type: LIST_DATA,
        currentPage: page,
        obj: resp.data
      });
    }, 1500);
  })
}