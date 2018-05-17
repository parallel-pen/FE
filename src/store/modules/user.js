import Cookies from 'js-cookie';

const state = {
  isLogged: false,
  account: '',
};

const mutations = {
  check(state) {
    const account = Cookies.get('account');
    if (account) {
      state.isLogged = true;
      state.account = account;
    }
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
  }
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
