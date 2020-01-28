import { CHANGE_TAB, GET_FILTER_DATA, CHANGE_FILTER } from './actionTypes';
import axios from 'axios'

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj: obj
  })
}

export const getFilterData = () => async (dispatch) => {
  // 使用async, await写法
  let resp = await axios({
    method: 'get',
    url: '/json/filter.json'
  })
  dispatch({
    type: GET_FILTER_DATA,
    obj: resp.data
  })
}

export const changeFilter = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_FILTER,
    obj: obj
  })

  dispatch({
    type: CHANGE_TAB,
    obj: {
      closePanel: true
    }
  })
}