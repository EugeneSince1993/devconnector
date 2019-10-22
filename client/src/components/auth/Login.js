import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
    console.log('SUCCESS');
  };

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

export default Login;