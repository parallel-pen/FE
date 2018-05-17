import fetch from './config';

export default {
  register({ account, password, invitation }) {
    return fetch.post('/register', {
      account,
      password,
      invitation,
    });
  },
  login({ account, password }) {
    return fetch.post('/login', {
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
