import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8888';

const fetch = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Authorization': Cookies.get('token'), // eslint-disable-line
  },
});

export default fetch;
