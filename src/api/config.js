import axios from 'axios';

const baseURL = 'http://localhost:8888/api';

const fetch = axios.create({
  baseURL,
  timeout: 8000,
  withCredentials: true,
});

export default fetch;
