import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES
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
    case UPDATE_LIKES:
      /* We're gonna return the state object with the current state ("...state"). 
      And then we wanna manipulate the "posts" (array) - because this is (happening) on the "list of posts" ("posts list") page. And we're gonna map through the "posts" array:
      "For each post we wanna go ahead and say: 'if the "post._id" is equal to the "payload.id" (that we passed as the payload in the "dispatch()" (function) of the "post" actions file - in the "addLike" and the "removeLike" actions (functions)).'"
      So we wanna make sure that it's the correct post that we're adding or removing the like to. So if it's a match (if the condition is being satisfied), then ("?") let's return the object with this individual post ("...post" - because all we wanna manipulate is the "likes" array). And for the "likes" (array) we want to update that with the "payload.likes", because we sent an object with both the id and the likes.
      Else then just return the regular post - as it is, if it's not the match (in the condition).
      To reiterate, we map through the "posts" array. We're gonna say:
      "For each post check to see if it's the correct one. If it matches the payload id, then we wanna return new state with just all the stuff that's in that post. We just wanna manipulate the "likes" (array) to the likes (array) that are returned. Whether it's an "addLike()" (action) or "removeLike()" (action), because they both return just the array of likes.
      So we're just updating the "likes" (array) value.
      And then if it doesn't match the id then just return the post (and don't do anything else)." 
      The next object property is a "loading". */
      return {
        ...state,
        posts: state.posts.map( post => 
          post._id === payload.id ?
            {
              ...post,
              likes: payload.likes
            } :
            post
        ),
        loading: false
      };
    default:
      return state;
  }
};