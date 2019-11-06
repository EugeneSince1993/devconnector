/* Bring in "axios" so we can make the requests. */
import axios from 'axios';
/* We'll be using alerts at some point so we might as well bring in the "setAlert()" action from the "alert" actions file. */
import { setAlert } from './alert';
/* Brin in the action types. */
import {
  GET_POSTS,
  POST_ERROR
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