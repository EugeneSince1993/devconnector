/* We bring in an "useState()" (hook) because we're gonna need some state for our form. */
import React, { Fragment, useState } from 'react';
/* We bring in the "withRouter" because we're redirecting in the "profile" actions file. */
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Bring in an "addExperience()" action. */
import { addExperience } from '../../actions/profile';

/* Destructuring */
const AddExperience = ({ addExperience, history }) => {
  /* Brad prefers using the "useState()" hook over using classes for dealing with state.
  With the "useState()" hook it's less code and looks nicer and cleaner. */
  const [ formData, setFormData ] = useState({
    /* default values */
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  /* We need to have a "to" propery disabled if a "current" property is "true". Because if the user has the current job now, there's no sense in the "to" property. 
  Another piece of state - "toDateDisabled". And then to change this piece of state we'll have "toggleDisabled" (function). And the default value will be "false".
  The "to" value (property) we need to be "disabled" if that "toDateDisabled" value is "true" (in the state). */
  const [ toDateDisabled, toggleDisabled ] = useState(false);

  /* Destructuring (pulling out) properties (props) from the "formData" state. */
  const {
    company,
    title,
    location,
    from,
    to,
    /* the "current" property will be connected with the "checkbox" input. */
    current,
    description
  } = formData;

  /* this "onChange" event handler (function) will be the same as the rest of our "onChange" event handlers. */
  const onChange = e => setFormData({
    /* We need to pass in our object state with the current "formData", and then take our key and value.
    For the particular field, we're gonna get it by the name, so we're gonna do "e.target.name" - we're gonna use that as the key. And then the value - "e.target.value".
    So that will change it (the field value) in the state. */
    ...formData,
    [e.target.name]: e.target.value
  });

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      {/* We'll add an "onSubmit" event handler. */}
      <form 
        className="form" 
        onSubmit={
          e => {
            e.preventDefault();
            /* Call our action of "addExperience()". 
            It's gonna take in the formData, and we're gonna do redirect so we need to pass in a "history", which is a part of our props.
            Once we submit, it should call the "addExperience()" action, pass in the data (formData), make the request and add an experience. */
            addExperience(formData, history);
          }
        } 
      >
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Job Title" 
            name="title" 
            value={title} 
            /* We're just calling the "onChange()".
            "onChange()" will stay the same in the every input except "checkbox" input.  */
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Company" 
            name="company" 
            value={company} 
            onChange={e => onChange(e)} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Location" 
            name="location" 
            value={location} 
            onChange={e => onChange(e)} 
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
            type="date" 
            name="from" 
            value={from} 
            onChange={e => onChange(e)} 
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input 
            type="date" 
            name="to" 
            value={to} 
            onChange={e => onChange(e)} 
            /* If the "toDateDisabled" is "true" then set this (disabled attribute) to "disabled", else set this to '' (nothing).
            And now if the "Current Job" is checked, we shouldn't be able to add a "To Date", because it wouldn't make sense. */
            disabled={toDateDisabled ? 'disabled' : ''} 
          />
        </div>
        <div className="form-group">
          <p>
            <input 
              type="checkbox" 
              name="current" 
              /* We'll set a "checked" attribute to the "current", which is "true" or "false". */
              checked={current} 
              value={current} 
              /* We need to do the "toggleDisabled()" when this field is checked but we also wanna set the form data (with the "setFormData()" function).
              So instead of calling the "onChange()" will put the curly braces and do the "setFormData()" from here. */
              onChange={
                e => {
                  setFormData({
                    /* The current "formData" state */
                    ...formData,
                    /* We're just setting the "current" to whatever the "current" isn't.
                    So if it's "false", we need it to be "true", and vice versa. */
                    current: !current
                  });
                  /* In addition to the "setFormData()" we need to do the "toggleDisabled()".
                  And we need to set that to whatever the "toDateDisabled" is not. "toDateDisabled" is a piece of the state.
                  We pass the opposite "toDateDisabled" value into the "toggleDisabled()". */
                  toggleDisabled(!toDateDisabled);
                  /* And then we need to have a checked value - a "checked" attribute, so we'll put that after the "name" attribute of this "checkbox" input. */
                } 
              } 
            /> {' '}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <textarea 
            name="description" 
            value={description} 
            onChange={e => onChange(e)} 
            cols="30" 
            rows="5" 
            placeholder="Job Description"></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link to="/dashboard" className="btn my-1">Go Back</Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  /* No mapStateToProps() */
  null,
  { addExperience }
/* In order to use the "history" object (if we're gonna pass that in somewhere) we need to use "withRouter()" method. So here in the second set of the "connect()" parentheses we're gonna pass in "withRouter()" in which we're gonna pass in the "AddExperience" component as an argument.
If we don't do this, it's not gonna allow us to pass in that "history" object and use it from the action. */
)(withRouter(AddExperience));