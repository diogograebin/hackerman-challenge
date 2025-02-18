import { createRouter, createWebHistory } from "vue-router";
import SearchView from "@/pages/SearchView.vue";
import ResultView from "@/pages/ResultView.vue";

const routes = [
  { path: "/", component: SearchView },
  { path: "/result/:name", component: ResultView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;