import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// import ReduxPromise from "redux-promise";

import reducers from './reducers';
import App from './components/app';

const logger = store => next => action => {
  const result = next(action);
  const form = store.getState().form.LPCodeTest;
  if(form.values) {
    // console.log(form.values);
  }
  return result
};

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
