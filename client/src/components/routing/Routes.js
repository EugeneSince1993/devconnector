import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert          from '../layout/Alert';
import Register       from '../auth/Register';
import Login          from '../auth/Login';
import Dashboard      from '../dashboard/Dashboard';
import CreateProfile  from '../profile-forms/CreateProfile';
import EditProfile    from '../profile-forms/EditProfile';
import AddExperience  from '../profile-forms/AddExperience';
import AddEducation   from '../profile-forms/AddEducation';
import Profiles       from '../profiles/Profiles';
import Profile        from '../profile/Profile';
import Posts          from '../posts/Posts';
import Post           from '../post/Post';
import NotFound       from '../layout/NotFound';
import PrivateRoute   from './PrivateRoute';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        {/* There is an id being passed in, so we need to do "/:id" (at the end of the route) to get that (id). */}
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        {/* It's a private route, because you have to be logged in to view posts. */}
        <PrivateRoute exact path='/posts' component={Posts} />
        {/* This route is gonna load the Post component. */}
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;