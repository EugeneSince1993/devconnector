import React from 'react';
import PropTypes from 'prop-types';

/* Destructuring */
const ProfileTop = (
  { 
    profile: {  
      status,
      company,
      location,
      website,
      social,
      user: {
        name,
        avatar
      }  
    } 
  }
) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img 
        className="round-img my-1" 
        src={avatar} 
        alt="developer" 
      />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} 
        {/* The "company" field is not required, so the user can not to fill it up.
            So we need to make a check.
            The ternary operator means:
            "If there is a company, then ("&&") show the span tag with "at" word and a company name within it." */}
        {company && <span> at {company}</span>}
        </p>
      {/* If there is a location, then ("&&") show the span tag with the location name within it. */}
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {/* If the website exists, then ("&&") let's display it. */}
        {
          website && (
            /* "href" is equal to the whatever the website is.
            And then we have "target='_blank'", so that it opens on a new tab.
            We also have "rel='noopener noreferrer'", so that we don't get the warning in the Chrome console. */
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )
        }
        {
          social && social.twitter &&
            (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )
        }
        {
          social && social.facebook &&
            (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )
        }
        {
          social && social.linkedin &&
            (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )
        }
        {
          social && social.youtube &&
            (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )
        }
        {
          social && social.instagram &&
            (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )
        }
      </div>
  </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;