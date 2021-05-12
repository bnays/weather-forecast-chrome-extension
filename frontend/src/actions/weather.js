import { FETCH_CURRENT_DATA, FETCH_HISTORIC_DATA, FETCH_COMPARE_HISTORIC_DATA } from '../constants/actionTypes';

export const getCurrentData = (state, action) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CURRENT_DATA, payload: state });
  } catch (error) {
    console.log(error.message);
  }
};

export const getHistoricalData = (state, action) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_HISTORIC_DATA, payload: state });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCompareHistoricalData = (state, action) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COMPARE_HISTORIC_DATA, payload: state });
  } catch (error) {
    console.log(error.message);
  }
};