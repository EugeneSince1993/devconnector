/* We have to have an "useEffect()" (hook) so that we can run the "getCurrentProfile()" action. So it will actually fetch the data and send it down to the state. */
import React, { Fragment, useState, useEffect } from 'react';
/* Just like we passed in the "history" object (in the "profile" actions file), we have to use something called "withRouter". "withRouter" will allow us to redirect from the action and use the "history" object. */
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Bring in a "createProfile()" action - an action to create or update (edit) a profile.
And also we bring in a "getCurrentProfile" action. We're gonna have to get the current profile, because we need to prefill the form fields. */ 
import { createProfile, getCurrentProfile } from '../../actions/profile';

/* Destructuring.
From the "profile" state we need a "profile" object (data about user) and a "loading". 
We destructure the action of the "createProfile" and the "history" object from the "props".
So this "createProfile" action we need to call on the form submit. */
const EditProfile = (
  { profile: { profile, loading }, 
  createProfile, 
  getCurrentProfile, 
  history 
  }
) => {
  /* In here we'll put the default values in the fields.
  That's the "formData" state with the default values.
  "setFormData" is a method to update the state. */
  const [ formData, setFormData ] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  /* "displaySocialInputs" is an another piece of state. It stores the group of the social media inputs. "toggleSocialInputs" is a method to update the "displaySocialInputs" state (to toggle - hide or show). The social inputs should be hidden by default. Default value will be "false" (so it will be a boolean value). */
  const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

  /* With the "useEffect()" hook it will keep reloading. So we need to put a set of the square brackets as a second argument of the "useEffect()". And inside them we'll put a prop. A prop we need to depend on is "loading" - so when it (data) loads that's when I want this ("useEffect()") to run. 
  The first argument of the "useEffect()" is a function.  */
  useEffect(() => {
    /* Inside here we're gonna run a "getCurrentProfile()" action. */
    getCurrentProfile();

    /* We have to implement the "setFormData()" function, we're gonna need to fill the form with current profile values.
    So after we get the profile, we're gonna call the "setFormData()" function. And we have to actually check. So we're gonna say: "the company (part (property) of the formData (state, object)), if it's "loading" or there is no "profile.company", then - have a blank field. If it's not "loading" and there is "profile.company", then fill it (this "company" field) with the "profile.company" data.".
    That should fill up the form fields. */
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      /* We need to check to see if there is a "social" object (if that exists in the data). */
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading]);

  /* Destructure all the props from the state. We're gonna pull all these fields from the formData. */
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => setFormData({
    /* The rest of the "formData" */
    ...formData,
    /* For the particular field, we're gonna get it by the name, so we're gonna do "e.target.name" - we're gonna use that as the key. And then the value - "e.target.value".
    So that will change it (the field value) in the state. */
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    /* We're submitting all the fields that are in that "formData" state.
    The third parameter of the createProfile() (action) is an "edit", and it's set to "false" by default. So we'll set an "edit" to "true". */
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> 
        Let's get some information to make your profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          {/* All of our social inputs will have "onChange" event handler. */}
          <select 
            name="status" 
            value={status} 
            /* We just call an "onChange()" event handler and pass in an event. */
            onChange={e => onChange(e)} 
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Company" 
            name="company" 
            value={company} 
            onChange={e => onChange(e)} 
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Website" 
            name="website" 
            value={website} 
            onChange={e => onChange(e)} 
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Location" 
            name="location" 
            value={location} 
            onChange={e => onChange(e)} 
          />
          <small className="form-text">
            City & state suggested (e.g., Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Skills" 
            name="skills" 
            value={skills} 
            onChange={e => onChange(e)} 
          />
          <small className="form-text">
            Please use comma separated values (e.g., HTML, CSS, JavaScript, PHP)
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="GitHub Username" 
            name="githubusername" 
            value={githubusername} 
            onChange={e => onChange(e)} 
          />
          <small className="form-text">
            If you want your latest repos and a GitHub Link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea 
            placeholder="A short bio of yourself" 
            name="bio"
            value={bio} 
            onChange={e => onChange(e)} 
          ></textarea>
          <small className="form-text">
            Tell us a little about yourself
          </small>
        </div>
        <div className="my-2">
          {/* 
            Let's add an "onClick" event handler to this button to toggle the "displaySocialInputs" state (from "true" to "false") by the "toggleSocialInputs()" method. And we want it to be whatever the opposite. If it's true, we wanna set to false and vice versa.
          */}
          <button 
            onClick={() => toggleSocialInputs(!displaySocialInputs)} 
            type="button" 
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {/* 
          We wanna test for "displaySocialInputs". If that's true then we're gonna show a Fragment, and we're gonna have inside this Fragment all these divs with the social inputs (form-groups). So that way these (social inputs) will only display if this "displaySocialInputs" (state) value is "true".  
        */}
        {
          displaySocialInputs &&
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input 
                  type="text" 
                  placeholder="Twitter URL" 
                  name="twitter" 
                  value={twitter} 
                  onChange={e => onChange(e)} 
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input 
                  type="text" 
                  placeholder="Facebook URL" 
                  name="facebook" 
                  value={facebook} 
                  onChange={e => onChange(e)} 
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input 
                  type="text" 
                  placeholder="Youtube URL" 
                  name="youtube" 
                  value={youtube} 
                  onChange={e => onChange(e)} 
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input 
                  type="text" 
                  placeholder="LinkedIn URL" 
                  name="linkedin" 
                  value={linkedin} 
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input 
                  type="text" 
                  placeholder="Instagram URL" 
                  name="instagram" 
                  value={instagram} 
                  onChange={e => onChange(e)} 
                />
              </div>
            </Fragment>
        }
        <input type="submit" value="Submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

/* We need to bring in the "profile" state. */
const mapStateToProps = state => ({
  profile: state.profile
});

/* Everything that is passed as the parameter of the connect(), that will be in the "props" object. We can access that with "props.nameOfTheParameterWePassedInTheConnect". */
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
/* In order to use the "history" object (if we're gonna pass that in somewhere) we need to use "withRouter()" method. So here in the second set of the "connect()" parentheses we're gonna pass in "withRouter()" in which we're gonna pass in the "CreateProfile" component as an argument.
If we don't do this, it's not gonna allow us to pass in that "history" object and use it from the action. */
)(withRouter(EditProfile)) ;