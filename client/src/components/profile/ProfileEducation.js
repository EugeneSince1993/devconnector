import React from 'react';
import PropTypes from 'prop-types';
/* Bring in the "Moment" extension to format date and time. */
import Moment from 'react-moment';

/* We take out from the "education" (that's being passed in) all the fields from the "AddEducation" form. */
const ProfileEducation = (
  {
    education: {
      school,
      degree,
      fieldofstudy,
      current,
      to,
      from,
      description
    }
  }
) => 
/* We can return this directly because we have an arrow function. */
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment>{' '}—{' '}
      {/* We check to see if there is a "to" field value. */}
      {
        !to ?
          ' Now' :
          <Moment format='YYYY/MM/DD'>{to}</Moment>
      }
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>;

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default ProfileEducation;