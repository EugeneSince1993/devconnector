import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Bring in the connect() function from 'react-redux'.
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
/* Bring in the "getCurrentProfile" action */
import { getCurrentProfile } from '../../actions/profile';

/* By destructuring we can use "getCurrentProfile" instead of "props.getCurrentProfile". 
Let's also add our "auth" state and "profile" state as the props.
We'll pull the "profile" and "loading" props out of the "profile" state.
We'll also destructure the "user" prop from the "auth" state. */
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  /* Since we only want this to run once, we need to put an empty set of square brackets (empty array) as a second parameter. */
  useEffect(() => {
    getCurrentProfile();
  }, []);

  /* If the profile is null and it's still loading (if loading: true and profile === null),
  then we're gonna show the spinner.  */
  return loading && profile === null ? 
    <Spinner /> : 
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>{' '}
        {/* If the "user" exists then show the "user.name".
            That uses the rule "condition then do something":
            condition && do_something 
        */}
        Welcome { user && user.name }
      </p>
      {/* If the profile is not equal to null then let's put a Fragment, else let's put another Fragment.  */}
      { 
        profile !== null ? 
          <Fragment>
            <DashboardActions />
          </Fragment> : 
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment> 
      }
    </Fragment>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

/* Anything in the state (reducer) we'll be able to get into this Dashboard component. */
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

/* Within connect() we're gonna be getting the "profile" state, as well as the "auth" state. */
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);