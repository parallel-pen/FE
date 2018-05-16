const state = {
  headerHeight: null,
  contentTop: null,
};

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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
