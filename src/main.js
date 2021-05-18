import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import '@assets/styles/global.less';
// 引入项目UI组件
import '@/plugins/antd.js'
// 导入网络请求模块
import '@/request'


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
