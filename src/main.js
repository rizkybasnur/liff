import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "@/router";
import store from "@/store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexChart", VueApexCharts);
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  store,
}).$mount("#app");
