/* Bring in "axios" so we can make the requests. */
import axios from 'axios';
/* We'll be using alerts at some point so we might as well bring in the "setAlert()" action from the "alert" actions file. */
import { setAlert } from './alert';
/* Bring in the action types. */
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

/* Get posts (a function to get posts) */
export const getPosts = () => async dispatch => {
  try {
    /* axios returns a promise so we put an await keyword. */
    const res = await axios.get('/api/posts');

    /* Dispatch the data into the "post" reducer.
       It's just gonna get the posts. And then that will put it (the posts) into the state. */
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

// Delete post
/* This action is gonna take in an id. (because) It needs to know which one (post) to delete. We're gonna make a DELETE request. */
export const deletePost = id => async dispatch => {
  try {
    /* Making the DELETE request. We don't need the "res" variable here (in other words, it's not mandatory). */
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      /* For the payload we're just gonna send the id so that in reducer we know how to filter out the post that got deleted from the UI. */
      payload: id
    });

    /* We do an alert here saying that the post has been deleted.
       We brought in the "setAlert()" action (earlier) in the top of this actions file. */
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  /* We add a "config" object since we're sending data. We'll have headers (object) in the "config" object. */
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    /* It's a POST request since we're adding the data. */
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      /* The payload will be the data we get back - which will be the (new) post. */
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    /* Dispatch the data into the "post" reducer.
       The payload will be the single post. */
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      /* We just send the data. Because when we add a comment, it returns the "comments" array. So that's what we're gonna get back and that's what we're gonna send as the payload. */
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
/* We want the "commentId" (prop, value) so we know which comment to delete. We don't need the "config" object, because all the data is in the "params". */
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    /* We could delete the "res" variable (but Brad didn't that), because it's not being used here. We could left only the actual "await axios.delete(`/api/posts/comment/${postId}/${commentId}`);" operation (command). */
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      /* The "payload" is the "commentId", so we know which comment to remove in the state and within the UI. */
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};