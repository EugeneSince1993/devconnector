// This file is our rootReducer (main reducer).
/* Here we bring in all our reducers. */

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

/* object as a parameter of combineReducers() will have all the
reducers that we create. */
export default combineReducers({
  alert,
  auth,
  profile,
  post
});