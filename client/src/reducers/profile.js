import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../actions/types';

/* default values */
const initialState = {
  /* When we login, profile is gonna make a request and it's gonna get all of our profile data and put that in here. Also, if we visit another user's profile page, it'll get put in here as well. So both sets of data we'll get put in here, because they both are individual profiles. */
  profile: null,
  /* "profiles" is an empty array to begin with. And that is for the profile listing page, when we have a list of developers, that state is gonna go in here. */
  profiles: [],
  /* When we fetch the GitHub repositories, we need a place for those. So those are gonna go here. */
  repos: [],
  /* We're gonna do the same as we did with the "auth" and set the loading to true as default. And then once we make a request, we'll set it to false. */
  loading: true,
  /* An "error" object for any errors in the request. */
  error: {} 
};

/* Reducer function */
export default function (state = initialState, action) {
  const { type, payload } = action;

  /* We'll run the switch() on the (action) type. */
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        /* our current state */
        ...state,
        /* We're sending the response back which includes the whole profile. So we're adding that (the whole profile) to the state.
        We're just filling the "profile" state. */
        profile: payload,
        /* We set "loading" to "false" once the request is done. */
        loading: false
      };
    case GET_PROFILES:
      return {
        /* All we really wanna do is fill the empty array ("profiles: []") with the profiles from the server. */
        // current state
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        /* everything that's currently in the state */
        ...state,
        /* We're sending that object with the message and the status (in the action function). */
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        /* We just set the "profile" back to "null" */
        profile: null,
        /* The profile could have GitHub repositories so we'll set the "repos" back to an "empty array". */
        repos: [],
        loading: false
      };
    /*  We just wanna fill the "repos" (property, that's an array) part of state with the user          repositories. */
    case GET_REPOS:
      return {
        // current state
        ...state,
        /* Let's fill the "repos" property with the payload. */
        repos: payload,
        loading: false
      };
    default:
      return state;  
  }
};