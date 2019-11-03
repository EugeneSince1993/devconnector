import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* We don't need "connect()" in the ProfileItem component. The ProfileItem is basically just a holder. We're passing in (sth) the profile data which we actually pull out (destructure) from the props. We'll also destructure out of the "profile" the fields that we want. */
const ProfileItem = (
  { 
    profile: { 
      /* The "user" (object) has inside of it an ID, a name and an avatar. So we need (to destructure) the "_id", the "name" and the "avatar" fields ("field values"). In addition to the "user" (object) we also destructure the "status", the "company", the "location" and the "skills" ("field values").
      This way we use these variables directly. */
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills
    } 
  }
) => {
  return (
    /* The code inside the div should just loop through the "profiles" (array) and output the "test" word. Each one of these "test" divs will be the ProfileItem component. While this component is loading, we can see a spinner in a certain moment at the page start. We see the spinner because it (application) is fetching the data. We don't wanna try to load anything (frontend) before the data is loaded.
    The "profile" className uses CSS grid so it's gonna align everything nicely. */
    <div className="profile bg-light">
      <img src={avatar} alt="avatar" className="round-img"/>
      <div>
        <h2>{name}</h2>
        <p>
          {status} 
          {/* If there is a company (because a company is not required), then ("&&") let's show a "span" tag. */}
          {company && <span> at {company}</span> }
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        {/* In the route we use an "_id" which is a part of the "user" object */}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {/* We only wanna have a maximum of 4 skills. "skills" is an array. So we need to map through it (with "the map()" method). But we only wanna 4 of the skills - so we'll use the "slice()" method. As far as the "map()" method, we'll put a set of parentheses into it. Because we also want the index, we're gonna use that (the index) as a key.
        In the "map()" method we wrap the function body with the parentheses (not curly braces).
        So we'll say: "For each skill, and give me the index. Then let's return an li tag, and give it (the li tag) a key (because 'skills' is just an array of words, there's no id in it. that's why we use the index as a key. because it has to be unique)". */}
        {
          skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className="fas fa-check"></i> {skill}
            </li>
            )
          )
        }
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;