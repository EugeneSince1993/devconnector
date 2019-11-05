import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/* Bring in the "connect()" method. */
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
/* Bring in the ProfileTop component. */
import ProfileTop from './ProfileTop';
/* Bring in the ProfileAbout component. */
import ProfileAbout from './ProfileAbout';
/* Bring in the ProfileExperience component. */
import ProfileExperience from './ProfileExperience';
/* Bring in the ProfileEducation component. */
import ProfileEducation from './ProfileEducation';
/* Bring in the ProfileGithub component. */
import ProfileGithub from './ProfileGithub';
/* Bring in the "getProfileById()" action (function).
We want that to run right away. */
import { getProfileById } from '../../actions/profile';

/* We destructure getProfileById, profile, auth and match. Before destructuring we could access to these items as the "props.getProfileById", "props.profile", "props.auth" and "props.match". And after we can simply use their names in the code.
From the "profile" state we need to get the "profile" and the "loading" properties. */
const Profile = (
  { 
    getProfileById, 
    profile: { profile, loading }, 
    auth, 
    match 
  }
) => {
  useEffect(() => {
    /* 
      To get the id, we're gonna get it from the URL.
      We can get the id with the props (with "props.match.params.id") - in the functional component. And we can get the id with "this.props.match.params.id" - in the class-based component.
      Instead of doing "props.match" (in our functional component), we can destructure "match" from the "props".
      "match.params.id" should match the id in the URL.
      So that will run immediately when the profile mounts (loads).
    */
    getProfileById(match.params.id);
    /* Add the "getProfileById" and the "match.params.id" as a dependency of the "useEffect". That will should get rid from the warning (in the console) about "React Hook" in this file. The array below is actually the dependency array.
    */
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {/* If "profile" is equal to "null" or "loading" is "true", then we need to show a spinner.
          Else then we need a "Fragment" with all our profile stuff (data). */}
      {
        profile === null || loading ?
          <Spinner /> :
          <Fragment>
            <Link to='/profiles' className='btn btn-light'>
              Back To Profiles
            </Link>
            {/* If user is logged in and loading is "false" and the user id equals the current profile id (we have the "_id" because the MongoDB made a such property when it was creating a user). If that (condition) matches, then ("&&") we need to show an "Edit Profile" button (as a Link to the "/edit-profile" route). In parentheses we put some complex expressions. */}
            { 
              auth.isAuthenticated && 
              auth.loading === false &&
              auth.user._id === profile.user._id &&
                (
                  <Link to='/edit-profile' className="btn btn-dark">
                    Edit Profile
                  </Link>
                )
            }
            <div className="profile-grid my-1">
              {/* We pass in the profile data as a prop.
                  Simply with "<ProfileAbout />" we pass in the layout. And with the "profile={profile}" attribute ("prop") we pass in the dynamic data that we can change any time by editing our profile. */}
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {/* We need to make sure that there is something in that "experience" array.
                    If there is, then we need to map (loop) through the "experience" array. */}
                { 
                  profile.experience.length > 0 ? (
                    <Fragment>
                      { 
                        profile.experience.map(experience => (
                          /* This is where we show (add) the ProfileExperience component.
                            And this is gonna take in a key, since we're iterating through (the array). And then we need to pass in the actual experience (prop). */
                            <ProfileExperience key={experience._id} experience={experience} />
                          )
                        )
                      }
                    </Fragment>
                  ) : ( 
                    <h4>No experience credentials</h4>
                  )
                }
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {/* We need to make sure that there is something in that "education" array.
                    If there is, then we need to map (loop) through the "education" array. */}
                {
                  profile.education.length > 0 ? (
                    <Fragment>
                      {
                        profile.education.map(education => (
                          /* This is where we show (add) the ProfileEducation component.
                            And this is gonna take in a key, since we're iterating through (the array). And then we need to pass in the actual education (prop). */
                            <ProfileEducation key={education._id} education={education} />
                          )
                        )
                      }
                    </Fragment>
                  ) : (
                    <h4>No education credentials</h4>
                  )
                }
              </div>
              {/* We wanna check to see if there is a "githubusername". If that exists then ("&&") we're gonna go ahead and display (add) the ProfileGithub component and pass the "username" prop into it.
              We need the "username" (prop) because we're gonna be calling that "getGithubRepos()" action (the "profile" action) from the ProfileGithub component. Earlier we were passing the "username" (as a prop) into the "getGithubRepos()" action (the "profile" action). */}
              { 
                profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                ) 
              }
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

/* The "mapStateToProps()" function takes in the "state" as a parameter. */
const mapStateToProps = state => ({
  profile: state.profile,
  /* We also need the "auth" state because we want to see if the user is logged in. Because if he is (logged in) and the profile, that he is viewing, matches, we need to have an "Edit Profile" button. In other words, when the logged in user views his own profile page, there should be an "Edit Profile" button on this page. */
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);