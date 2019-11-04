/* We're gonna be making requests so we need to bring in "axios". */
import axios from 'axios';
/* We're gonna be setting alerts in certain places so we'll bring in "setAlert" action (type).
We use destructuring. We take out the function from the file. */
import { setAlert } from './alert'; 
/* Import the action types */
import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
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

// Get all profiles
export const getProfiles = () => async dispatch => {
  /* When we go to the profile list page, we need to clear whatever is in the current profile.         Because when we visit a single user's profile, it's gonna go into the state.
     It will prevent the flashing of the past user's profile. */
  dispatch({ type: CLEAR_PROFILE });

  try {
    /* That's gonna get an array (list) of all the profiles */
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by (the user) ID
/* This function's gonna take in the "userId". We're specifically saying "userId", because we're not getting it (the profile) by the profile id, but the user id. */
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    /* We're gonna dispatch just the "GET_PROFILE" (action type), because we're filling that profile with the payload. */
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github repos
/* This action will take in the Github username.
   We have the route on the backend that will return the repositories. */
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      /* We're going to send the data which is gonna be the repos as the payload.  */
      payload: res.data
    });
  } catch (err) {
    /* All the profile errors we're doing the same way. */
    dispatch({
      type: PROFILE_ERROR,
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

/* Add an Experience.
The "addExperience()" function (action) will take in formData. It also takes in a "history", because we need to redirect back to the dashboard afterwards.  */
export const addExperience = (formData, history) => async dispatch => {
  try {
    /* Since we're sending data, we need to create our "config" object. */
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    /* We make a PUT request to update the needed data. We made the "experience" PUT request while we were working in the backend. */
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      /* "res.data" will be a profile */
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    /* Redirect to the Dashboard */
    history.push('/dashboard');
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

/* Add an Education
The "addEducation()" function (action) will take in formData. It also takes in a "history", because we need to redirect back to the dashboard afterwards. */
export const addEducation = (formData, history) => async dispatch => {
  try {
    /* Since we're sending data, we need to create our "config" object. */
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    /* We make a PUT request to update the needed data. We made the "education" PUT request while we were working in the backend.
    '/api/profile/education' is an endpoint. */
    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      /* "res.data" will be a profile */
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    /* Redirect to the Dashboard */
    history.push('/dashboard');
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

// Delete experience
/* We need to hit the endpoint, we're gonna make DELETE request to the profile experience and the ID of the experience. the "deleteExperience()" is gonna take the experience id. */
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
/* We need to hit the endpoint, we're gonna make DELETE request to the profile education and the ID of the education. the "deleteEducation()" is gonna take the education id. */
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
/* It's not gonna take any parameters in. It's gonna know the account from the token.  */
export const deleteAccount = () => async dispatch => {
  /* Since it's such a dangerous thing to do - delete your whole account - we definitely wanna a confirmation. So we'll just do "window.confirm()" in the condition. */
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      /* endpoint we hit is "/api/profile" with DELETE request */
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED});

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};