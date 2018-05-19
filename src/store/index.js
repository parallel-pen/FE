import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    user,
  },
});
