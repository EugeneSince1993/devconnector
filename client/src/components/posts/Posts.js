/* Bring in the "Fragment" and the "useEffect()" hook. We need useEffect, because we're gonna call the "getPosts()" action. */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
/* Bring in "connect()" function */
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
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
    <div>

    </div>
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