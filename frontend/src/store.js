import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import storage from './utils/storage';

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleWare),
    storage(),
  );

const store = createStore(reducers, enhancer);

export default store;