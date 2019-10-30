import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
/* We'll be using the "Moment" package here to format our dates. */
import Moment from 'react-moment';
import { connect } from 'react-redux';

/* As far as props we're gonna have the experiences passed in from the parent component which is gonna be "Dashboard.js". So experiences will be passed in as the "experience" item. */
const Experience = ({ experience }) => {
  /* We have an access to the "experience" which is being passed in as a prop, and that's gonna be the array. We wanna map through that. "map()" takes in a function. So we're gonna say:
  "for each experience (exp) then we're gonna return some JSX.". So in here we're gonna have td, which is gonna have a key, and that key is gonna be the "exp._id".  */
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {/* Let's format the "from" and "to" dates. "Moment" takes in "format". */}
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
        {/* "to" date is gonna be "null" if the "current job" field is checked.
         So we need to evaluate that. */}
        {
          exp.to === null ? 
          (' Now') : 
          (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        {/* This is gonna have an "onClick", that calls an action. */}
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            {/* Blank th for the delete button. */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* We have to loop through all our experiences and get the data. We will have the data being passed in, we have to loop through it and then format it. So we'll put that in the variable called "experiences". */}
          {experiences}
        </tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  /* "experience" is an array. */
  experience: PropTypes.array.isRequired
};

export default Experience;