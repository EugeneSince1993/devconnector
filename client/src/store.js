/* we import applyMiddleware, because we'll be using "thunk", and it is
a middleware */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
/* We're gonna have multiple reducers. One for "auth", one for "profile", "alert" and so on.
But we're gonna combine them in a "rootReducer". rootReducers will be in a folder called
"reducers", and the exact file will be called "index.js". Therefore we'll make such path to it. */
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;