import { HEAD_DATA  } from './actionTypes.js';
import axios from 'axios';

export const getHeaderData = () => (dispatch) => {
  axios({
    method: 'get',
    // method: 'post',
    url: '/json/head.json'
    // url: 'http://localhost:3000/api',
    // data: {
    //   url: 'http://i.waimai.meituan.com/ajax/v7/home/head',
    //   params: {
    //     not_need_primary_filter: false,
    //     userid: 280770501
    //   }
    // }
  }).then((resp) => {
    dispatch({
      type: HEAD_DATA,
      obj: resp.data
    })
  })
}