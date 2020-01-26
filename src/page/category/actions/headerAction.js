import { CHANGE_TAB  } from './actionTyps';

export const changeTab = (obj) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    obj: obj
  })
}