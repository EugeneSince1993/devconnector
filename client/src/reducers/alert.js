/* Bring in action types */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

/* This just pertains to alerts. alerts will be objects in this array the id, message, and then an alert type which would be something like success or error. That way in the alert component we can look at the alertType and decide what color we want it to be - red for errors and green for success.  
const initialState = [
  {
    id: 1,
    msg: 'Please log in',
    alertType: 'success'
  }
];
*/
const initialState = [];

/* 
The function will take in the state which by default is the initial state and an action. This action is gonna contain two things. One mandatory thing is a type, and then a payload which will be the data. And sometimes we may not have any data. We might just call an action type, but no data. The type is what we need to evaluate. And we're gonna do that with "switch" statement. Action is an object, and it should have a type attached to it. And we wanna evaluate that by cases. The types... we could put a string here, for instance, we're gonna have 'SET_ALERT' as a type. Now common convention is to use variables (or constants) for types. And that's what we're gonna do.
Depending on the type, we need to decide what we wanna send down as far as state. We need to return something here, and we're gonna return (for the state) an array. Because the case is adding an alert. State is immutable so we have to include any other state that's already there so we're gonna use the spread operator (...) and say: "...state", which is the first parameter of the function. 
So if there is already an alert in the state, we wanna make sure that we're just basically copy it, and add our (new) alert with type "SET_ALERT", and we can do that by just saying:"action.payload" (we'll have the data inside of the payload). And this payload has an id, a message and alert type. This "case SET_ALERT" will add a new alert to the array.
And as far as REMOVE_ALERT, we want to remove a specific alert by its id. We're gonna return the state, which is the array. And we'll filter through the alerts, because we wanna remove only a specific alert. We're gonna send along an id. 
In filter we'll say: "For each alert I want to check to see if the 'alert.id' is not equal to the 'action.payload'". The payload in this case is gonna be just the id. The payload can be whatever we want. And this will make more sense, when we create the "actions" file - we actually will dispatch the action types (SET_ALERT and so on).
In addition to these two cases we just wanna default.
So as far as the default, we're just gonna return the state. So every reducer we create is gonna have a "default" case of just "return state".
Instead of writing "action.type" and "action.payload" we'll just destructure in the beginning of the function body.
To sum up, we dispatch the action type of "SET_ALERT" and we return the array with the payload (with the new alert). And "REMOVE_ALERT" is gonna filter through and it's gonna return all alerts except for the one (id) that matches the payload (id).
*/
export default function (state = initialState, action) {
const { type, payload } = action;

switch (type) {
  case SET_ALERT:
    return [...state, payload];
  case REMOVE_ALERT:
    return state.filter(alert => alert.id !== payload);
  default:
  return state;
}
};