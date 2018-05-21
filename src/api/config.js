import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://api.parallelpen.top';

const fetch = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Authorization': Cookies.get('token'), // eslint-disable-line
  },
});

export default fetch;
