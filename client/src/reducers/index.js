// This file is our rootReducer

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';


/* object as a parameter of combineReducers() will have all the
reducers that we create. */
export default combineReducers({
  alert,
  auth
});