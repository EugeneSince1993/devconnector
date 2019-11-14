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
    case GET_POST:
      return {
        // The current state ("state" object)
        ...state,
        /* The "post" is just gonna be the "payload". Because it's just sending that single post. We're gonna update that in the state. */
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        // The current state ("state" object)
        ...state,
        /* All we have to do here is assign to the "posts" (array) the (current) array with the (current state) "...state.posts". So basically it just makes a copy of it. And then we wanna just add a new post which is in the "payload". We kinda update the "posts" array with the new post. The first array item is "with what we update (what we add)" (the new post). And the second array item is "what we update" (the "posts" array).
        That will return our (new) post down to our component. Any component that uses the "posts" part of this "state", it's gonna return that down with the new post. */
        posts: [ payload, ...state.posts],
        loading: false
      };
    /* We just wanna filter out the post that got deleted. */
    case DELETE_POST:
      return {
        // the current state
        ...state,
        /* We just want to edit posts (the "posts" array) by filtering through.
           For each "post" we're gonna match the following: "post._id" is not equal to the "payload". Because the "payload" is just the id.
           So we're just returning all posts except for the one that matches the condition. Because that's the one that got deleted. So we wanna just immediately remove that from the UI. */
        posts: state.posts.filter(post => post._id !== payload),
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
    case ADD_COMMENT:
      return {
        // The current state ("state" object)
        ...state,
        /* We only need to edit the "post" part of the state. That's the "post" object, since this (comment) is gonna be on the single post page. 
        It's an object, we want whatever is in it currently, so we'll put the "...state.post" (first object property). And then we wanna manipulate the "comments" (second object property, array). We wanna replace it with the "payload". Because the "payload" is just all the comments. 
        The first object property is "what we update" (the "post" object, which is in the current state). And the second object property is "with what we update (what we add)" (the new comment(-s) (from the "payload") - in the "comments" array). */
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        /* For the "post" (object) we need to filter out the comment (that should be removed). So we want the current stuff that's in the "post" ("...state.post"). And then for the "comments" (array) we need to filter through. So we're gonna say:
        "'state.post.comments' which is that array ('comments')". 
        And then let's do a "filter()":
        "For each 'comment' we wanna filter out anything that is the comment with the specific id.".
        So let's say:
        "Where ('when') 'comment._id' is equal to the 'payload'.
        The first object property is "what we update" (the "post" object, which is in the current state). And the second object property is "with what we update" (we remove the specific comment from the 'comments' array, and return the updated 'comments' array)."
        */
        post: {
          ...state.post,
          /* This "payload" should be the "id" (the "commentId"). The "filter()" array method will do so that we'll return all the comments except the specific comment we need to remove.
          We want to bring in all the comments except the one with that id, because that was just deleted from the server. So we wanna delete it from the state and from the UI.
          The filter() method creates a new array with all elements that pass the test implemented by the provided function. */
          comments: state.post.comments.filter(comment => comment._id !== payload)
        },
        loading: false
      };
    default:
      return state;
  }
};