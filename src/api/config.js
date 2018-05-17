import axios from 'axios';

const baseURL = 'http://localhost:8888/api';

axios.defaults.baseURL = baseURL;

export default axios;
