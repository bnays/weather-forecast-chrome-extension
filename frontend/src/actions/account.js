import { FETCH_ALL } from '../constants/actionTypes';

export const getRobots = (state, action) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL, payload: state });
  } catch (error) {
    console.log(error.message);
  }
};