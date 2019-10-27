import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
/* Bring in the "connect()" because we want to connect to Redux.
We wanna bring in "auth" state. */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* Bring in the "logout" action */
import { logout } from '../../actions/auth';

/* From the "auth" state we'll destructure and pull  an "isAuthenticated" and a "loading" out from the "auth" state, because we wanna make sure that the user is downloading before we put the links in (the Navbar - depending if we're logged in or not). And we pull the "logout" our of the props. */
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  /* We'll create a couple variables for guest links and auth links. */
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        {/* "#!" will just have the link to go nowhere (JSX syntax) */}
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
          </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        {/* "#!" will just have the link to go nowhere (JSX syntax) */}
        <a href='#!'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {/* We wanna basically say if we're not loading. So if we've done loading.
        Because in the "initialState" (in the "auth" reducer) the "loading" is set to "true" by default. And then once we fetch the user or we get an error, loading get set to false.
        So we wanna make sure that the "loading" is "false" before we show the menu.
        There's a couple things we could do. We could use a ternary (operator). We could say:
        "if not loading then do what we're gonna do, else then don't show anything", in code it is:
        !loading ? '' : null
        Since we have null at the end, we can just get rid of that. And we can use double-ampersand.
        So basically we're saying: "if not loading then do this", in code it is:
        !loading && ''
        And what we wanna do here is just to show the Fragment. And inside the Fragment we're gonna put a ternary (operator), because we wanna check to see if we are authenticated (if we're logged in). If we are authenticated then we wanna show "authLinks", else we wanna show "guestLinks". And we use a ternary (operator) instead of "something && ''" syntax because we have "else".
      */}
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

/* Get the entire "auth" state */
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);