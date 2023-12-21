import Create from "@/views/CreateView.vue";
import Update from "@/views/UpdateView.vue";
import Statistic from "@/views/StatisticView.vue";
import Movies from "@/views/MoviesView.vue";
import Search from "@/views/SearchView.vue";
import Views from "@/views/ViewsView.vue";
import Login from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: Create,
    name: "create",
  },
  {
    path: "/update",
    component: Update,
    name: "update",
  },
  {
    path: "/statistic",
    component: Statistic,
    name: "statistic",
  },
  {
    path: "/movies",
    component: Movies,
    name: "movies",
  },
  {
    path: "/search",
    component: Search,
    name: "search",
  },
  {
    path: "/views",
    component: Views,
    name: "views",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
];

export default routes;
