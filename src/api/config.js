import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8888/api';
const token = Cookies.get('token');

const fetch = axios.create({
  baseURL,
  timeout: 8000,
  headers: { 'Authorization': token },
});

export default fetch;
