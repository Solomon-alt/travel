import { createStore } from "vuex";

export default createStore({
  state: {
    getData: ''
  },
  mutations: {
    modify(state) {
      state.getData = JSON.parse(localStorage.getItem('username')!)
    }
  },
  actions: {},
  modules: {}
});
