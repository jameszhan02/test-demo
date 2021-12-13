import axios from 'axios';

const devBaseURL = 'https://api.hatchways.io/';
// const prodBaseURL = 'TBD';

let baseURL = devBaseURL;
// if (process.env.REACT_APP_API_URL) {
//   baseURL = process.env.REACT_APP_API_URL;
// }

// if (process.env.NODE_ENV === 'production') {
//   baseURL = prodBaseURL;
// }

const jwtAxios = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});
export default jwtAxios;