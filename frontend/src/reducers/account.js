import { FETCH_CURRENT_DATA, FETCH_HISTORIC_DATA } from '../constants/actionTypes';

export default (account = [], action) => {
  switch (action.type) {
    case FETCH_CURRENT_DATA:
      return action.payload;
    case FETCH_HISTORIC_DATA:
      return action.payload;
    default:
      return account;
  }
};

