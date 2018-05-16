import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import layout from './modules/layout';

Vue.use(Vuex);

const state = {
  userInfo: {
    username: '',
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    layout,
  },
});
