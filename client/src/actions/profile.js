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

// Create or update a profile
/* As a first parameter we're gonna have form data ("formData") that's submitted. After we submit the form we need to redirect. As a second parameter we're gonna pass in the "history" object, which has a method called "push()", that will redirect us to a client-side route.
In order to know if we're updating or editing the profile or creating a new profile, we're gonna have a third parameter called "edit", that we'll set to "false" by default. */
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    /* Since we're sending data, we need to create our "config" object. */
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    /* We need to make a request. We're making a POST request to the 'api/profile'. 
       'api/profile' is the route to create a new profile or update it.
       axios returns a promise, so we put "await". */
    const res = await axios.post('/api/profile', formData, config);

    /* Once the request has happen, all we need to do as far as dispatching to our reducer is the "GET_PROFILE" action type. Because it's gonna return the profile. "payload" is gonna be the "res.data" which will be an actual profile. */
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    /* 
    We also need to set an alert that says that profile has been updated or the profile has been created. Profile might be updated or created so we need the message to be different depending on that. So for the message we're gonna say:
    if "edit" is "true" then say 'Profile Updated', else then say 'Profile Created'. In code it is:
    edit ? 'Profile Updated' : 'Profile Created'. We've added 'success' as a second argument to have our alerts green.
    */
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    /* If we are editing the profile, we're not gonna redirect, we'll just stay on the page.
    If we are creating the profile, then we wanna redirect.
    So for creating a new profile: if not "edit" then let's take that "history" object and let's call the "push()" method, and let's redirect to '/dashboard'.
    Redirection in an action is little different. We can't use "return <Redirect />;" here like we do it in the components. We have to pass in this "history" object, which has the "push()" method on it. */
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    /* We need our validation errors in an alert. "errors" is an array.
    We get the errors from the "err.response.data.errors". And if there are any errors, then we loop through and we just output them in an alert.
    So, for instance, if we forget the "status", "skills" or any required fields, then that will show in an alert. */
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    /* Dispatch the profile error with the message and status. */
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};