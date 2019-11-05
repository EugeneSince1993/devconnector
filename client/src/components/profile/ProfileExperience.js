import React from 'react';
import PropTypes from 'prop-types';
/* Bring in the "Moment" extension to format date and time. */
import Moment from 'react-moment';

/* We take out from the "experience" (that's being passed in) all the fields from the "AddExperience" form. */
const ProfileExperience = (
  {
    experience: {
      company,
      title,
      location,
      current,
      to,
      from,
      description
    }
  }
) =>
/* We can return this directly because we have an arrow function. */
  <div>
    <h3 className="text-dark">{company}</h3>
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
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>;

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileExperience;