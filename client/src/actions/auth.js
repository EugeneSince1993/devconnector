/* we make our http requests with axios */
import axios from 'axios';
/* we can call setAlert action from anywhere */
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

/*
Load User 
*/
export const loadUser = () => async dispatch => {
  /* We need to check to see if there's a token and
  there is, what we're gonna do is put it (the token)
  in a global header. We know how we have to send a 
  header with that "x-auth-token". If we have a token in
  the local storage, we just wanna always send that.
  We'll create a file to do that.
  We're gonna check the local storage. We're gonna do this here 
  and in the main "App.js" file. So that will set the header, the token if there is
  one.
  This only check the first time that user loads.
  */
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  /* Then we will make our request.
     Endpoint that we wanna hit is "/api/auth"  */

  try {
    const res = await axios.get('/api/auth');

    /* If everything goes ok, then we wanna dispatch "USER_LOADED".
    Type will be "USER_LOADED", and then the payload is gonna be
    the data that's sent from that route, which is the user. So we'll
    use "res.data".
    So it will send the payload (which will be the user) to this
    action type in the reducer.
     */
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

/* 
Register User
We're pretty much doing the same thing that we did back when
tested the requests within the Register component. We're just
doing it from the action.
*/
export const register = ({ name, email, password }) =>
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    /* We are preparing the data to send */
    const body = JSON.stringify({ name, email, password });

    try {
      /* We're making a POST request to the "api/users".
      that will get the response. */
      const res = await axios.post('/api/users', body, config);
      /* if everything goes ok, if we don't get "400" Error or
      whatever, then we wanna dispatch "REGISTER_SUCCESS".
      The payload will be the data that we get back which
      in this case is gonna be the token. We get the
      token back on a successful response. */
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      /* we get the "errors" array */
      const errors = err.response.data.errors;

      /* we check to see if there are any errors.
      if they are, we're gonna loop through them.
      forEach() takes in a function. So will say:
      "for each error, then we want to dispatch
      the 'setAlert()'". We'll pass in error.msg and
      the type which in this case will be 'danger',
      because we want it to be red, it's an error. */
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      /* and we don't need a payload here.
         if we look at "REGISTER_FAIL" in reducer,
         we don't do anything with a payload so we
         don't have to send it. */
      dispatch({
        type: REGISTER_FAIL
      });
    }
};