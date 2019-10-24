/* It's just a function that takes in a token. If the token is there, then it's gonna add it to the headers. If not, it's gonna delete it (token) from the headers.
We're not making a request with axios, we're adding a global header. */
import axios from 'axios';

const setAuthToken = token => {
  /* check for a token. and the token we pass in is gonna come from the local storage.
  so basically it's gonna see if there is a token in the local storage or not. if
  there is then we're gonna set the global header by doing:
  axios.defaults.headers.common['x-auth-token'] = token;
  the header we wanna set is "x-auth-token" and we'll set that to the token that's passed in. */
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
  /* else, if what we pass in is not a token then we're gonna delete it from the global headers.
  the reason we're doing this is so that when have a token we're just gonna send it with every request instead of picking and choosing what request to send it with. */
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;