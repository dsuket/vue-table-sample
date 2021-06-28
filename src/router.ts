import Vue from "vue";
import Router from "vue-router";
import HomePage from "./pages/HomePage.vue";
import TablePage from "./pages/TablePage.vue";
import CheckBoxPage from "./pages/CheckBoxPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/table",
      name: "TablePage",
      component: TablePage,
    },
    {
      path: "/checkbox",
      name: "CheckBoxPage",
      component: CheckBoxPage,
    },
  ],
});
