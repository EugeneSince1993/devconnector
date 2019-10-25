import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Bring in the "login" action
import { login } from '../../actions/auth';

/* Since the "login" action is a prop, we'll destructure it - pull it out of props. */
const Login = ({ login, isAuthenticated }) => {
    /*
  useState Hook
  We're pull formData (our (component) state - object with all the field values) and setFormData() (the function we wanna use to update our state) out from useState().
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
  formData is a state.
  */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

    // Destructuring
  /* The state (items) will be available anywhere in this code from here:  */
  const { email, password } = formData;

    /* In setFormData() we wanna change the (initial) state so we'll pass an object in it.
     We only wanna change the name. So we need to make a copy of "formData" (state), so
     we'll use a spread operator ("..."), so that will just copy what's in there. And we wanna
     change the name (second parameter) to the value of the input (name), so 'e.target.value'.
     To use the "name" attribute of any input as a key, we can implement it like that: 
     [e.target.name]. This way we can use onChange() on every field.
  */
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // console.log('SUCCESS');
    login(email, password);
  };

  // Redirect if logged in
  /* And with React Router we can do <Redirect />, and then add a "to" prop. And we'll redirect to
  "/dashboard". We haven't created that route yet but that's ultimately where we're gonna go. */
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

// Property validation
Login.propTypes = {
  login: PropTypes.func.isRequired,
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

/* The first argument is a "mapStateToProps()" function.
   As the second argument we have actions.
   Now "login" action is a prop. So we'll add PropTypes */
export default connect(
  mapStateToProps,
  { login }
)(Login);