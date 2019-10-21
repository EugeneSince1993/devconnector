import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
      console.log('Passwords do not match');
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

export default Register;