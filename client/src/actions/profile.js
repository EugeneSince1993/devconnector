/* We're gonna be making requests so we need to bring in "axios". */
import axios from 'axios';
/* We're gonna be setting alerts in certain places so we'll bring in "setAlert" action (type).
We use destructuring. We take out the function from the file. */
import { setAlert } from './alert'; 
/* Import the action types */
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// Get the current user's profile
export const getCurrentProfile = () => async dispatch => {
  /* Make a request to the backend.
  We're gonna hit (access) the "api/profile/me" route with a GET request. The "api/profile/me" route is gonna give us the profile of whatever user is logged in with the current token ("req.user.id"). */
  try {
    /* axios returns a promise so we add "await". we don't have to pass in an ID or anything like that. it's gonna know which profile to load from the token we sent which has the user ID. */
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      /* the '/api/profile/me' route returns all the profile data. we're gonna put that into our state. */
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      /* We're gonna send along the payload, because we have that "error" property in the initialState (in the "profile" reducer). So we're gonna send an object with a message ("msg"), and we can get the message text with "err.response.statusText". And then we also need to send the HTTP status which we can get with "err.response.status". That should give us like a "400" or whatever the status is. */
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};