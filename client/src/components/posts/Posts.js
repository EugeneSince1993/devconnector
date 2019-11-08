/* Bring in the "Fragment" and the "useEffect()" hook. We need useEffect, because we're gonna call the "getPosts()" action. */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
/* Bring in "connect()" function */
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
/* Bring in the "getPosts()" action */
import { getPosts } from '../../actions/post';

/* Destructuring. From the "post" prop (that comes from the state) we're gonna get "posts" and "loading". */
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    /* Call the "getPosts()" action. */
    getPosts();
    /* Add the "getPosts" dependency to the dependency array. */
  }, [getPosts]);

  return (
    <Fragment>
      {/* We wanna make sure that it (the data) is not loading:
          "If it is loading, then ('?') let's show the spinner. Else (":") then load a Fragment with the actual data." */}
      { 
        loading ? 
          <Spinner /> : 
          (
            <Fragment>
              <h1 className="large text-primary">Posts</h1>
              <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
              </p>
              {/* Post Form */}
              <div className="posts">
                {/* We wanna map through our "posts" array.
                    For each post we wanna load a "PostItem" component. We need to pass in a key (prop) which will be the "post._id", and then we pass the actual post data (prop). */}
                {
                  posts.map(post => (
                    <PostItem key={post._id} post={post} />
                  ))
                }
              </div>
            </Fragment>
          )
      }   
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  /* the "post" state */
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);