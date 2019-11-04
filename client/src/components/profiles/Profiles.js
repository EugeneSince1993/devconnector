/* We're gonna need "useEffect()" (hook). Because as soon as this profile loads, we need to call that getProfiles() action that we created before. So we'll need "useEffect()" for that. */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* While the profiles are loading, we wanna show that Spinner. */
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
/* Bring in the "getProfiles()" action. */
import { getProfiles } from '../../actions/profile';

// Destructuring
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  /* As soon as the profile loads, we need to call the getProfiles() action. We'll pass in this        action as a first argument.
     We want this useEffect() function to run once, so we'll put an empty array (empty set of the square brackets, []) as a second argument.
     So that should put the profiles in the state. */
  useEffect(() => {
    getProfiles();
    /* Add the "getProfiles" as a dependency of the "useEffect". That will should get rid from the warning (in the console) about "React Hook" in this file. The array below is actually the dependency array. */
  }, [getProfiles]);
  return (
    <Fragment>
      {/* 
        We need to get the profiles from the state. But we only want to show the profiles if the  "loading" is "false". If the "loading" is "true" then we will show the "spinner". 
      */}
      { 
        loading ? 
          <Spinner /> :
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles">
              { /* We need to loop through the profiles and output each item. 
                We check the length of the "profiles" array (if there are any profiles). 
                If the length of the "profiles" array is greater than 0, then we'll go ahead and do something. Else we will put "No profiles found..." in the h4 tags.*/ }

              { 
                profiles.length > 0 ? 
                  /* We take the profiles and we map through them.
                     For each profile we need to return the <ProfileItem /> (component) that will take in a key (with an ID value), and we also need to pass in the profile data ("profile" object) for that particular one (profile). */
                  (
                    profiles.map(profile => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  ) : 
                  <h4>No profiles found...</h4> 
              }
            </div>
          </Fragment>
       }
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

/* We're gonna set the "mapStateToProps" to the function that takes in the state. */
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);