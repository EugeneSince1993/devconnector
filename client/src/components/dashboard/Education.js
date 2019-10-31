import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
/* We'll be using the "Moment" package here to format our dates. */
import Moment from 'react-moment';
import { connect } from 'react-redux';
/* Bring in "deleteEducation()" action */
import { deleteEducation } from '../../actions/profile';

/* As far as props we're gonna have the educations (learnings, schools) passed in from the parent component which is gonna be "Dashboard.js". So educations (learnings, schools) will be passed in as the "education" item. */
const Education = ({ education, deleteEducation }) => {
  /* We have an access to the "education" which is being passed in as a prop, and that's gonna be the array. We wanna map through that. "map()" takes in a function. So we're gonna say:
  "for each education (edu) then we're gonna return some JSX.". So in here we're gonna have td, which is gonna have a key, and that key is gonna be the "exp._id".  */
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {/* Let's format the "from" and "to" dates. "Moment" takes in "format". */}
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
        {/* "to" date is gonna be "null" if the "current job" field is checked.
         So we need to evaluate that. */}
        {
          edu.to === null ? 
          (' Now') : 
          (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
        }
      </td>
      <td>
        {/* This is gonna have an "onClick", that calls an action.
            In the JSX expression we just call the "deleteEducation()" and we pass in an ID into it. And that should delete the education item. */}
        <button onClick={() => deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            {/* Blank th for the delete button. */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* We have to loop through all our educations and get the data. We will have the data being passed in, we have to loop through it and then format it. So we'll put that in the variable called "educations". */}
          {educations}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  /* "education" is an array. */
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);