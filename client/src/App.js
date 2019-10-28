import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar         from './components/layout/Navbar';
import Landing        from './components/layout/Landing';
import Alert          from './components/layout/Alert';
import Register       from './components/auth/Register';
import Login          from './components/auth/Login';
import Dashboard      from './components/dashboard/Dashboard';
import CreateProfile  from './components/profile-forms/CreateProfile';
import EditProfile    from './components/profile-forms/EditProfile';
import PrivateRoute   from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Bring in the "loadUser" action from "auth" file
import { loadUser } from './actions/auth';
// Bring in the setAuthToken function
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  /* useEffect() hook.
  The way that we can dispatch the "loadUser" action from here (App.js) is by taking the "store" directly (because we have the access to the store), and then we can just call "dispatch()", which is a method on the store. And then we can simply pass in "loadUser()". */
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
