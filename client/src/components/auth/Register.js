import React, { Fragment, useState } from 'react';
/* the item below connects this component to the Redux.
we do this so that we could work with Redux. */
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
/* Bring in the "setAlert" action */
import { setAlert } from '../../actions/alert';
/* Bring in the "register" action */
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

/* 
  The props come in as a Register component's parameter.
  So we should be able to do "props.alert".
  That was a previous step. Now we'll do destructuring.
  UPDATE:
  Now instead "props.setAlert" we can use simply "setAlert".
  And the operation of destructuring looks this way: { setAlert } (as a parameter
    of the Register component's function).
*/
const Register = ({ setAlert, register, isAuthenticated }) => {
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
  formData is a (component) state (values).
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
      // console.log('SUCCESS');
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  /* And with React Router we can do <Redirect />, and then add a "to" prop. And we'll redirect to
  "/dashboard". We haven't created that route yet but that's ultimately where we're gonna go. */
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={e => onChange(e)}
          />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
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

// Property validation
Register.propTypes = {
/* we're gonna have setAlert and register as Prop Types */
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

/* We need to get the "auth" state into the component.
   And now it will give us everything - all the properties from the initialState of the
   "auth.js" reducer:
   auth: state.auth
   But all we need is a "isAuthenticated" property, we need to check this value to see if we're authenticated. So we'll type this way:
   isAuthenticated: state.auth.isAuthenticated
   Now isAuthenticated is a prop, so we'll add it to the PropTypes.
   And since isAuthenticated now is a prop, we need to add it as a parameter in the main (component) function.
*/
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

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
We have to export "connect()" with the "setAlert" action in order to use it, and then 
this action is available within "props". So we destructured "setAlert", pulled it out the "props",
we called it, when the passwords don't match. And we sent the message and the alert type. 
as a first parameter, we have a "mapStateToProps()" function,
and as a second parameter we have (call) a "setAlert" action. */
export default connect(
  mapStateToProps, 
  { setAlert, register }
)(Register);