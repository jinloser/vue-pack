import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/login/index.vue";
import ModulesLoader from "@/components/main/modules/ModulesLoader";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, form, next) => {
  if (to.path !== '/') {
    if (!form.name) {
      const routers = window.sessionStorage.getItem('routers');
      if (routers) {
        window.sessionStorage.removeItem('routers')
        ModulesLoader.initRouters(router, JSON.parse(window.atob(routers)), false);
        router.replace(to.path, () => {
          window.sessionStorage.setItem('routers', routers);
        }, (err) => { console.log(err) });
      }
    }
  }
  next();
})
export default router;
