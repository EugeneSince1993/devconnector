/* Bring in React and "useEffect()" hook. */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
/* We need "connect()" since we're gonna be calling an action. */
import { connect } from 'react-redux';
/* Bring in the Spinner because we'll be fetching the data. */
import Spinner from '../layout/Spinner';
/* Bring in the "getGithubRepos()" action */
import { getGithubRepos } from '../../actions/profile';

/* In the props we're gonna have the "username" that's passed in (in the "getGithubRepos()" profile action), also the "getGithubRepos()" action. We're gonna have the "repos" themselves which we'll get from the state. */
const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    /* We call the "getGithubRepos()" action, and we pass in the "username" prop. */
    getGithubRepos(username);
    /* Add the dependencies of the "useEffect". That will should get rid from the warning (in the console) about "React Hook" in this file. The array below is actually the dependency array. We claim the "getGithubRepos" and the "username" as the dependencies of the "useEffect" hook. */
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {/* We need to make sure that the "repos" (array) is not "null". If the "repos" (array) is equal to "null", then ("?") we'll show the Spinner. Else then (":") we're gonna map through the "repos" (array) and display the repositories. */}
      { 
        repos === null ? <Spinner /> : (
          /* "For each repo let's show a div" */
          repos.map(repo => (
              <div key={repo._id} className="repo bg-white p-1 my-1">
                {/* We use the CSS-grid to align the following two div tags. */}
                <div>
                  <h4>
                    {/* Link to the repository.
                        With 'target="_blank"' attribute the link will open in the new tab. 
                        With 'rel="noopener noreferrer"' we won't have any warnings relating to this link in the console .
                    */}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {/* Name of the repository */}
                      {repo.name}
                    </a>
                  </h4>
                  {/* Description of the repository */}
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    {/* The stars */}
                    <li className="badge badge-primary">
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className="badge badge-light">
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            )
          )
        )
      }
    </div>
  );
};

/* All the props we need should get put in this object. These props should pass the check on type. */
ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  /* We just want the "repos" array. */
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);