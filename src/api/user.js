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
  userinfo() {
    return fetch.get('/userinfo');
  },
  err(code) {
    switch (code) {
      case 200000:
        return `${code} 表单格式错误`;
      case 200001:
        return `${code} 用户不存在`;
      case 200002:
        return `${code} 密码错误`;
      case 200004:
        return `${code} 密码含有非法字符`;
      case 200007:
        return `${code} 邀请码无效`;
      case 200008:
        return `${code} 邀请码已被使用`;
      case 200009:
        return `${code} 账号已被注册`;
      default:
        return `${code} 未知错误`;
    }
  },
};
