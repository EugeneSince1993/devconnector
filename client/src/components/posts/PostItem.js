import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
/* Bring in Link because we're gonna link to the actual single post page that has all the comments. */
import { Link } from 'react-router-dom';
/* We'll have a date to format so we'll bring in the "Moment". */
import Moment from 'react-moment';
/* The reason we're bringing in the "connect()" here is we're gonna have a bunch of actions like "add like", "remove like", "delete a post". */
import { connect } from 'react-redux';

/* From the "post" (object) that's passed in the PostItem component, we're gonna destructure that ("post" object) and pull out the "_id", "text", "name", "avatar", "user", "likes", "comments", "date". */
const PostItem = (
  { 
    auth, 
    post: {
      _id,
      text,
      name,
      avatar,
      user,
      likes,
      comments,
      date
    } 
  }
) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src={avatar}
            alt="avatar"
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          {/* We need to pass in a format. */}
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          {/* We need to make sure that there are some likes before we decide to do the "{likes.length}". "likes" is an array. the "{likes.length}" expression will tell us how many likes this post has.  */}
          {
            likes.length > 0 &&
              (
                <span>
                  {likes.length}
                </span>
              )
          }
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}          
          {/* We need to make sure that there are some comments before we decide to do the "{comments.length}". "comments" is an array. the "{comments.length}" expression will tell us how many comments this post has.  */}
          { 
            comments.length > 0 && 
              (
                <span className='comment-count'>
                  {comments.length}
                </span>
              ) 
          }
        </Link>
        {/* We only want it (the "delete post" button) to show if it's the (current) user's post:
            "If not 'auth.loading' and ("&&") 'user === auth.user._id'." 
            So the first 'user' is the post user ("post.user"), and the second one is the logged-in user ("auth.user._id"). So we wanna make sure that those match. If they do then ("&&" - if we have no "else" statement) we wanna show the "delete post" button. */}
        { 
          !auth.loading && user === auth.user._id && 
            (
              <button type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
            ) 
        }
      </div>
    </div>
  );
};

PostItem.propTypes = {
  /* "post" object that's passed in the PostItem component. */
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

/* We're gonna need the "auth" state, so we'll do "mapStateToProps()". And then we're gonna bring the "auth" state, because we need to tell who is who. So that the delete button shows up only on user when the posts belong to him. */
export default connect(
  mapStateToProps,
  {}
)(PostItem);