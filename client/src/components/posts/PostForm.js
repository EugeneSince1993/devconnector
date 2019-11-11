/* We bring in the "useState" (hook), because this is gonna be a form. So we need (some) component level state. */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Bring in the "addPost" action */
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  /* 
  We're using state.
  So we're gonna pull (out) the "text" (a string) and the "setText" (as the method) and set this to "useState()". And this is just gonna be a string, since we only have one field for this form, so we are not gonna use a "formData" object. We're just gonna have one string ("text") in our state.
  */
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
      <form 
        className="form my-1" 
        onSubmit={
                    e => {
                      e.preventDefault();
                      /* We're gonna add post and pass in the "text" ("string") as an object. That's gonna be the "formData" within the "addPost()" action. */
                      addPost({ text });
                      /* And then we wanna clear the form. So we'll call the "setText()" function and just set the "text" to an empty string. */
                      setText('');
                    }
                 }>
        <textarea 
          name="text"
          /* "text" (a string) from our component state */ 
          value={text} 
          /* We call the "setText()" and then we pass in a string, which is gonna be the value of the input ("e.target.value"). */
          onChange={e => setText(e.target.value)} 
          cols="30" 
          rows="5" 
          placeholder="Create a post" 
          required 
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

/* We're not actually bringing in any state from Redux. */
export default connect(
  null,
  { addPost }
)(PostForm);