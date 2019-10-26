import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* 
From the "component" that's passed in we wanna get any other parameters (that are passed in) so we're gonna use the "...rest" operator. And it will take anything else that's passed in.
As I suppose, in the "component: Component" expression the "Component" means main App component.
We need to interact with the "auth" state in our "auth" reducer in order for this to work. So we need to bring in "connect()".
We wanna pull in the "auth" props so we'll just add "auth" as a second destructured parameter.
Let's destructure "auth" - take out "isAuthenticated" and "loading".
Instead of a "return()" we're just gonna put a <Route />, because we've brought that in.
Any custom props that are passed as the "...rest" in the parameter, we want those props in the Route. We'll type "{...rest}", and after that we're gonna have a "render" (to render the props).
And this is where we wanna check to see if we are authenticated or not.
If not "isAuthenticated" and not "loading", then we wanna redirect. Else then we wanna load whatever the component is that's passed in. So we can simply do "<Component />", and any props that are passed in to that - "{...props}". {...props} pertains to the "props" as a parameter in the "render" expression.
*/
const PrivateRoute = ({ 
  component: Component, 
  auth: { isAuthenticated, loading }, 
  ...rest 
}) => (
  <Route
    {...rest}
    render={props => 
      !isAuthenticated && !loading ? 
      (<Redirect to='/login' />) : 
      (<Component {...props} />) 
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  /* We map (get) the "auth" state - all the state that's in the "auth" reducer. */
  auth: state.auth
});

export default connect(
  mapStateToProps
// no action passed in as a second parameter
)(PrivateRoute);