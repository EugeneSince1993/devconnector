import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/* We're gonna use the "connect()" method, because we're gonna have the "deleteComment()" action. */
import { connect } from 'react-redux';
/* "react-moment" is a package for the formatting data. */
import Moment from 'react-moment';
/* Bring in the "deleteComment()" action */
import { deleteComment } from '../../actions/post';

/* We have the "props" as the parameters. 
We've passed in (the "CommentItem" route in the "App.js") the "postId", the "comment" (which we destructure), the "auth" (state) and the "deleteComment" (action). */
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        {/* Link to the user's profile. 
        We have an access to the user id, that comes from the "comment" (look at the "props" area, where we destructure the "user" out of the "comment" object) */}
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            /* "avatar" from the "comment" object. */
            src={avatar}
            alt=""
          />
          {/* "comment.name" */}
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {/* "comment.text" */}
          {text}
        </p>
        <p className="post-date">
          Posted on {' '}
          <Moment format='YYYY/MM/DD'>
            {/* "comment.date" */}
            {date}
          </Moment>
        </p>
        {/* The conditional (expression):
            If not "auth.loading" (we wanna make sure that the "auth" is not loading) and ("&&") "user === auth.user._id" (We wanna make sure it's the actual user that made the comment. So we wanna make sure that that (user) is equal to the logged in user ("auth.user._id")). 
            Then ("&&" - because we have no "else" statement) we add a "delete" button. 
        */}
        {
          !auth.loading && user === auth.user._id &&
            (
              /* We add an "onClick" event handler to this button.
                 When we click a "delete" button, the "deleteComment()" action is being called.
                 The "deleteComment()" action takes in the post id, which we can get from just the "postId" (from the props). Also the "deleteComment()" action takes in a comment id ("_id", which we passed in as a prop). */
              <button 
                onClick={e => deleteComment(postId, _id)} 
                type="button" 
                className="btn btn-danger" 
              >
                <i className="fas fa-times"></i>
              </button>
            )
        }
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);