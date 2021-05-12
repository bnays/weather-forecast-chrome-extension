import { FETCH_CURRENT_DATA, FETCH_HISTORIC_DATA, FETCH_COMPARE_HISTORIC_DATA } from '../constants/actionTypes';

const weather = (weather = [], action) => {
  switch (action.type) {
    case FETCH_CURRENT_DATA:
      return action.payload;
    case FETCH_HISTORIC_DATA:
      return action.payload;
    case FETCH_COMPARE_HISTORIC_DATA:
      return action.payload;
    default:
      return weather;
  }
};

export default weather