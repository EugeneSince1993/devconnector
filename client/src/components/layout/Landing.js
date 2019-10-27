import React from 'react';
import { Link, Redirect } from 'react-router-dom';
/* We bring in "connect()", because we need to interact with the state to see if we're logged in. */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* By destructuring we can use "isAuthenticated" instead of "props.isAuthenticated". */
const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Developer Connector</h1>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="buttons">
          <Link to='/register' className="btn btn-primary">Sign Up</Link>
          <Link to='/login' className="btn btn-light">Login</Link>
        </div>
      </div>
    </div>
  </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/* We don't have any action here. */
export default connect(
  mapStateToProps
)(Landing);