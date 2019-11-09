/* Bring in "axios" so we can make the requests. */
import axios from 'axios';
/* We'll be using alerts at some point so we might as well bring in the "setAlert()" action from the "alert" actions file. */
import { setAlert } from './alert';
/* Brin in the action types. */
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES
} from './types';

/* Get posts (a function to get posts) */
export const getPosts = () => async dispatch => {
  try {
    /* axios returns a promise so we put an await keyword. */
    const res = await axios.get('/api/posts');

    /* It's just gonna get the posts. And then that will put it (the posts) into the state. */
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      /* We get the "status text", put it in the message. We also get the actual status code and put that into the status. */
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
/* We need to know which post we're adding a like to. So we're gonna have to pass in the post id ("id"). */
export const addLike = id => async dispatch => {
  try {
    /* axios returns a promise so we put an await keyword.
       We're making a PUT request, because we're updating the post (the "likes" array, which is in the "posts" array which is in the "post" object (state)).
       And the endpoint is `/api/posts/like/${id}`, where we're passing in the post id ("id"). */
    const res = await axios.put(`/api/posts/like/${id}`);

    /* When we get our response back, we're gonna dispatch the "UPDATE_LIKES" action type. And      we're send along as a payload an object with the post id and the "likes" array as the        data that comes back ("res.data"). What is returned is the array of likes. */
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    /* We just get the "likes" array back, and we're gonna send them to the reducer. */
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};