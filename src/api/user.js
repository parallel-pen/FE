import axios from './config';

export default {
  register({ account, password, invitation }) {
    return axios.post('/register', {
      account,
      password,
      invitation,
    });
  },
  login({ account, password }) {
    return axios.post('/login', {
      account,
      password,
    });
  },
  err(code) {
    switch (code) {
      case 200001:
        return '错误';
      default:
        return '未知错误';
    }
  },
};
