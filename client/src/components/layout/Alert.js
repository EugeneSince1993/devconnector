import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
"alerts" is an array. 
if "alerts" is not equal to "null" and length of the "alerts" array is greater than zero
and map the "alerts" array...
map() is like a forEach(), except it returns something. In our case we're gonna return some JSX
for each alert.
*/
const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 && 
  alerts.map(alert => (
  /* here we'll do our JSX. inside the div we want the alert message.
     for this div we're gonna add a key. whenever you map through an
     array like this and output JSX, it's a list you need to have an unique
     key. and then we need to style it, using the constructin like this:
     className={``} */
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.msg }
  </div>                              
));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

/* 
In the Alert component we want to get the alert state. What we saw in the ReduxDevTools - that array containing objects with properties of msg, alertType and id - we wanna fetch that into the Alert component.
So we will create a variable called "mapStateToProps". We're mapping the Redux state to a prop in this Alert component so that we have access to it (to the state). In this case this is gonna be an array of alerts.
Simply put, that means "show the alert state in the Alert component".
In the curly braces we put whatever state we want or whatever prop we wanna call it, which we are gonna call "alerts". And then we can use "state." and then - whatever we want from the rootReducer. Only reducer we have in rootReducer now is an "alert". So to get the state inside of "alert", we wanna just say (finally): "state.alert".
So now we'll have "props.alerts" avalaible to us. Instead of using "props.alerts" we will just do destructuring in the Alert component function's parameter place.

*/
/* with "mapStateToProps" we're getting the state from the alert reducer.
We're mapping state to props, getting the alert state, put it inside of prop of alerts, destructure it in the Alert component function's parameter. We pass in "alerts" as the parameter there. Make sure it's not null, it has something in it. And if it does, we're gonna map through them, and we're gonna output a div with the message and the styling (based on the alert type). */
const mapStateToProps = state => ({
  alerts: state.alert
});

/* 
connect() takes in "mapStateToProps".
if we had any actions to call, that would go second (as a second parameter),
just like we did in the Register component. 
*/
export default connect(mapStateToProps)(Alert);