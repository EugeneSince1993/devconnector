import uuid from 'uuid';
/* We import these action types because we're gonna dispatch them. That will call the case that we've just put in the alert reducer. */
import { SET_ALERT, REMOVE_ALERT } from './types';

/* 
We want to dispatch more than one action type from this function right here. We have something called "dispatch()" that we can add. We're able to do a syntax like that because of the "thunk" middleware: () => dispatch => {}
For the alert id, we wanna randomly generate this - with help of "uuid" package. uuid will give us an universal id on the fly.
There are different version of the universal random IDs. We'll be using version 4.
Then we need to call "SET_ALERT" action type (that's in our alert reducer). We can do that by using "dispatch()".
As a parameter of dispatch(), we're gonna pass in an object. And as its property, we'll set "type: SET_ALERT". So that's how it's gonna resolve the type in the alert reducer file. We also need to send along the payload. And the payload is gonna be whatever message is passed in, whatever alert type is passed in, and then the id.
*/ 
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};