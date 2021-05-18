import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // 全局 state
  state: {},
  // state中数据的get方法, 用于数据的初步包装
  getters: {},
  // 即时/非异步 修改 state 中数据的方法
  mutations: {},
  // 异步修改 state 中数据的方法
  actions: {},
  modules: {},
});
