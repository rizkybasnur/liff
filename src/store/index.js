import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAdmin: false,
    isLoggedIn: false,
  },
  mutations: {
    setAdminStatus(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    setLoggedInStatus(state, isAdmin) {
      state.isLoggedIn = isAdmin;
    },
  },
  actions: {
    updateAdminStatus({ commit }, isAdmin) {
      commit("setAdminStatus", isAdmin);
    },
    updateLoginStatus({ commit }, isLoggedIn) {
      commit("setLoggedInStatus", isLoggedIn);
    },
  },
});

export default store;
