import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SearchView from '../views/SearchView.vue';
import LoadingView from '../views/LoadingView.vue';
import ResultView from '../views/ResultView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/loading',
    name: 'Loading',
    component: LoadingView
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
