const getters = {
};

const actions = {
};

const mutations = {
  updateHeaderHeight(state, height) {
    state.headerHeight = height;
  },
  updateContentTop(state, top) {
    state.contentTop = top;
  },
  toggleLoginShow(state) {
    state.isLoginShow = !state.isLoginShow;
  },
};

const state = {
  headerHeight: null,
  contentTop: null,
  isLoginShow: false,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
