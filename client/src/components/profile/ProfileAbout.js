import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = (
  /* Destructuring */
  { 
    profile: {  
      bio,
      skills,
      user: { name }
    } 
  }
) => 
/* We don't even need the "return()" and the curly braces, since we're using an arrow function. */
<div className="profile-about bg-light p-2">
  {/* We should show the following the h2 tag, the p tag and the div.line tag only in case we have a "bio" property (variable). Because "bio" is an optional field. So we'll make a conditional:
      "If there is a 'bio', then we need a Fragment". 
  */}
  {
    bio && (
      <Fragment>
        {/* We only need the first name so we use the "trim()" method at first. Then we use the "split()" method, which will turn our string ("name" string) into the array. And we wanna split the string by space. So that it will actually turn, e.g., "Brad Traversy" into an array with two items: first one is "Brad", second one is "Traversy".
        So we need to take the first item which is a first name, so we want "zero" index - we'll add "[0]" at the end of the expression. */}
        <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
        {/* Biography Text */}
        <p>
          {bio}
        </p>
        <div className="line"></div>
      </Fragment>
    )
  }
  <h2 className="text-primary">Skill Set</h2>
  <div className="skills">
    {/* Skills are in the 'skills' array, so we're gonna have to map through those.
        Let's map through the "skills" array. We'll put inside it an another set of parentheses because we need an index as well.
        For each skill let's put a div.p-1 tag and an i.fas.fa-check tag.
        We need to put an key in the div.p-1 tag, since we map through this "skills" array. The key is gonna be equal to the index. And next to the "check" icon we'll put the "skill" value (variable). */}
    {
      skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check"></i> {skill}
          </div>
        )
      )
    }
  </div>
</div>;

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;