import React, { Fragment, useState } from 'react';
/* the item below connects this component to the Redux.
we do this so that we could work with Redux. */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/* Bring in the "setAlert" action */
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

/* 
  The props come in as a Register component's parameter.
  So we should be able to do "props.alert".
  That was a previous step. Now we'll do destructuring.
  UPDATE:
  Now instead "props.setAlert" we can use simply "alert".
  And the operation of destructuring looks this way: { setAlert } (as a parameter
    of the` Register component's function).
*/
const Register = ({ setAlert }) => {
  /*
  useState Hook
  We're pull formData (our (component) state - object with all the field values) and setFormData() (the function we wanna use to update our state) out from useState() (Hook).
  formData - this is gonna be our state just like if we had a class, we may have:
  state = {
    formData: {
      name: '',
      email: ''
    }
  }
  And the setFormData() is like when we would do "this.setState", and we would pass a new values in (the state).
  We'll put the default values in an object as a parameter of useState().
  Actually, the initialization below is the initial state.
  formData is a state (values).
  */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Destructuring
  /* The state (items) will be available anywhere in this code from here:  */
  const { name, email, password, password2 } = formData;

  /* In setFormData() we wanna change the (initial) state so we'll pass an object in it.
     We only wanna change the name. So we need to make a copy of "formData" (state), so
     we'll use a spread operator ("..."), so that will just copy what's in there. And we wanna
     change the name (second parameter) to the value of the input (name), so 'e.target.value'.
     To use the "name" attribute of any input as a key, we can implement it like that: 
     [e.target.name]. This way we can use onChange() on every field.
  */
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    /* We wanna make sure that password matches. This is an advantage of useState Hook.
       With it we can access the state anywhere. We shouldn't pass the state in somewhere.
       And we can simply update the state by calling "setFormData()". */
    if (password !== password2) {
      /*
        "props.setAlert()" method pass the 'Passwords do not match' as a message to our actions
        ("alert.js" - file with alert action), alerType and id. 
        UPDATE:
        Because of we did destructuring above, now we use simply "setAlert" instead of
        "props.setAlert"
      */
      setAlert('Passwords do not match', 'danger');
    } else {
      /* we can access the state (formData) directly.
         formData is filled with the form data. */
      // console.log(formData);
      console.log('SUCCESS');
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          {/* input "Name" needs to be a controlled component. 
              We'll use "onChange" handler on this input.
              The goal here is to call (with a help of "onChange" handler) 
              the setFormData() and to update the "name" field in the state.
              We could call setFormData() directly. */}
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};


/* 
  whenever we use connect(), we need to export it. 
  whenever we bring in an action, when we wanna use it, you have to
  actually pass it in to connect().
  connect() takes in 2 things. one is any state that you wanna map. so
  if we want to get state from alert or profile or anything else, we put that as
  a first parameter. we're just gonna put "null", because we don't need anything right now.
  the second parameter is gonna be an object with any actions you wanna use - in our case, "setAlert".
  This will alow us to access "props.setAlert". And the "props" come in as a Register
  component's parameter.
  So we should be able to do "props.alert".
  UPDATE:
  That was a previous step. Now we'll do destructuring.
*/

Register.propTypes = {
  /* we're gonna have setAlert as a Prop Type */
  setAlert: PropTypes.func.isRequired
}

/* we have to export "connect()" with the "setAlert" action in order to use it, and then 
this action is available within "props". So we destructured "setAlert", pulled it out the "props",
we called it, when the passwords don't match. And we sent the message and the alert type. 
as a first parameter, we don't have a "mapStateToProps()" function,
but as a second parameter we have (call) a "setAlert" action. */
export default connect(null, { setAlert })(Register);