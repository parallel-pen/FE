import Cookies from 'js-cookie';

const mutations = {
  check(state) {
    const account = Cookies.get('account');
    if (account) {
      state.isLogged = true;
      state.account = account;
      return true;
    }
    state.isLogged = false;
    return false;
  },
  save(state, { account, token }) {
    state.isLogged = true;
    state.account = account;
    Cookies.set('account', account);
    Cookies.set('token', token);
  },
  logout(state) {
    state.isLogged = false;
    state.account = '';
    Cookies.remove('account');
    Cookies.remove('token');
  },
};

const actions = {};

const state = {
  isLogged: false,
  account: '',
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
