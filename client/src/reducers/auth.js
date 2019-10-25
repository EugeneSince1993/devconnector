import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
 } from '../actions/types';

    /*  
    So that's our state for the authentication.
    Here is the default values.
    */
const initialState = {
   /* We're gonna look for an item called token
      in the local storage. That will be the
      default for the token in our state. */
   token: localStorage.getItem('token'),
   /* In case of successful response as far as registration or
      authorization we'll set the "isAuthenticated"
      to "true". By default it will be "null". That's the value
      we're gonna check to, for instance, make the navbar have the
      Dashboard, Logout links and all that stuff - to show stuff
      that only users can see. */
   isAuthenticated: null,
   /* 
      we wanna make sure that, for instance, when we load 
      a user, and to see if the user is authenticated, we
      wanna make sure that the loading is done. So that we've already made
      a request to the backend and go to (get) response. We'll set "loading" to
      "true" by the default. And when we make our request and get the data
      or get the response, then we'll set it to false so we know
      that it has been loaded.
   */
   loading: true,
   /*  
      When we make a request to the backend, to that "api/auth",
      and we get the user data including the name, email, avatar,
      all that stuff, that will get put in here.
   */
   user: null
}

/* That's actually our reducer.
   And the reason we do this is just so we don't have to put 
   all this information inside of the parameter. So we created a
   variable and made it nice and neat. And then we're gonna take
   the action that's dispatched. */
export default function (state = initialState, action) {
  const { type, payload } = action;
  
  /* run a switch on the type. */
  switch (type) {
     /* that will load the user. */
   case USER_LOADED:
      return {
         ...state,
         /* that means that the token works, we're now logged in. */
         isAuthenticated: true,
         loading: false,
         /* because that payload includes the user. and that will be
         the name, the email, the avatar. everything but the password.
         because in our backend "auth" route we're doing:
         "const user = await User.findById(req.user.id).select('-password');",
         so we're not sending the password.
         */
         user: payload
      };
   /* we wanna test the case of "REGISTER_SUCCESS". if the
       register is successful, we get the token back, so we
       want the user to just get logged in right away.
       We're gonna set local storage and we're gonna stew (set)
       a "setItem", because we want to put the token that's
       returned inside a local storage. If we've got token above,
       we would put in the state before. "payload" is an object.
       We'll set a token to the "payload.token".
       "...state" means "whatever is currently in the state",
       because state is immutable.
       In return we've set "loading" to "false", because we've
       got a response, it (user) has been loaded.
   */ 
   /* To reiterate, it's gonna put the token in the local storage. It's gonna set
   "isAuthenticated" to "true", set the payload and set "loading" to false.  */
   case REGISTER_SUCCESS:
   case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
   case REGISTER_FAIL:
   case AUTH_ERROR:
   case LOGIN_FAIL:
   case LOGOUT:
      /* for REGISTER_FAIL we're gonna remove anything that's
         in local storage in that token. Because if it is a
         failed login, I just wanna remove the token completely.
         With "removeItem()" we remove token from the local storage.
         With "token: null" we're setting the value to "null".
         "loading: false" because even it's fail, it would still
         downloading.
         for AUTH_ERROR - it's gonna do the same exact thing.
         It just clears all the "auth" state and it also clears the
         token from the local storage.
         Basically we don't wanna have a token that isn't valid in
         the local storage ever.
      */
     /* To reiterate - it's gonna remove the token and it's gonna set everything
     to "null". */
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
   default:
      return state;
  }
};
 