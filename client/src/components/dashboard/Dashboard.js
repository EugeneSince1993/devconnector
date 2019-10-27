import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Bring in the connect() function from 'react-redux'.
import { connect } from 'react-redux';
/* Bring in the "getCurrentProfile" action */
import { getCurrentProfile } from '../../actions/profile';

/* By destructuring we can use "getCurrentProfile" instead of "props.getCurrentProfile". 
Let's also add our "auth" state and "profile" state as the props. */
const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  /* Since we only want this to run once, we need to put an empty set of square brackets (empty array) as a second parameter. */
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div>
      Dashboard
    </div>
  );
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