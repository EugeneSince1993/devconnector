/* We're gonna use the "useEffect" (React hook) because we need to get the post when this (component, route) loads. */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
/* Bring in the "Spinner" component. */
import Spinner from '../layout/Spinner';
/* Bring in the "PostItem" component. We're importing the PostItem component, showing the same post item for the single post, except that we hide the 4 action buttons. */
import PostItem from '../posts/PostItem';
/* Bring in the "CommentForm" component. */
import CommentForm from './CommentForm';
/* Bring in the "getPost" action. */
import { getPost } from '../../actions/post';

/* Destructuring from the "props".
   We're also gonna need to get the id from the URL, which is in the "props.match", so we'll pull that out as well. */
const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    /* We call the "getPost()" action. And we need to get the id from the URL, which we can get with the "match.params.id". */
    getPost(match.params.id);
    /* We add as a dependency the "getPost" action (in the dependencies array). */
  }, [getPost]);

  /* We wanna make sure that the post has been loaded first. So let's return the following:
     "If the 'loading' is 'true' or ("||") the 'post' is equal to 'null', then ("?") we wanna show the 'Spinner' (component). Else (":") then we want a Fragment. And in this Fragment is where we're gonna put the 'PostItem' (component). But we're gonna pass in the 'post' first of all, so it has data ('post={post}'). And then we're gonna send in the 'showActions', and we wanna pass in 'false' ('showActions={false}'). " */
  return (
    loading || post === null ?
      <Spinner /> :
      <Fragment>
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
        {/* We need to pass the "postId" as a prop. */}
        <CommentForm postId={post._id} />
      </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

/* mapStateToProps (function) takes in the "state" (object) as a parameter. */
const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  /* We're gonna be pulling in the "post" state. */ 
  mapStateToProps,
  { getPost }
)(Post);