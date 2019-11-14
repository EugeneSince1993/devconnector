/* It is a form, so we're gonna use the "useState()" (React hook).
This form is actually gonna be similar to the "PostForm". */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Bring in the "addComment()" action */
import { addComment } from '../../actions/post';

/* Destructuring. We pass in the "postId" and the "addComment" as the props. */
const CommentForm = ({ postId, addComment }) => {
  /* 
  We're using state.
  So we're gonna pull (out) the "text" (a string) and the "setText" (as the method) and set this to "useState()". And this is just gonna be a string, since we only have one field for this form, so we are not gonna use a "formData" object. We're just gonna have one string ("text") in our state.
  */
  const [ text, setText ] = useState('');

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>
      <form 
        className="form my-1" 
        onSubmit={ e => {
            e.preventDefault();
            /* We're gonna add post and pass in the "text" ("string") as an object. That's gonna be the "formData" within the "addPost()" action. */
            addComment(postId, { text });
            /* And then we wanna clear the form. So we'll call the "setText()" function and just set the "text" to an empty string. */
            setText('');
          } 
        } 
      >
        <textarea 
          name="text"
          /* "text" (a string) from our component state */ 
          value={text} 
          /* We call the "setText()" and then we pass in a string, which is gonna be the value of the input ("e.target.value").
          We're just gonna set text to whatever is in the text box (textarea). In other words, anything we type in the "textarea" tag, it will be added into the state. */
          onChange={e => setText(e.target.value)} 
          cols="30" 
          rows="5" 
          placeholder="Create a comment" 
          required 
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);