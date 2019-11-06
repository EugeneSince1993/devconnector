import {
  GET_POSTS,
  POST_ERROR
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

// Reducer function
export default function (state = initialState, action) {
  /* Destructure (pull out) type and payload from the action */
  const { type, payload } = action;

  /* We do a "switch" statement. We're gonna evaluate the type. */
  switch (type) {
    /* This will just fill the posts array and the posts page, after all. */
    case GET_POSTS:
      /* We're just gonna return the object */
      return {
        // current state (we use "spread" operator ("..."))
        ...state,
        /* We fill the "posts" array with the "payload". The "payload" will come from the "post" action file. */
        posts: payload,
        loading: false
      };
    /* For the post error, we just wanna fill the error (object) with the "payload" (which comes from the "post" action file). */
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};