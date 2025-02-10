import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './pages/LoginView.vue';
import SearchView from './pages/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,  // Aqui deve estar a referência para o componente de login
  },
  {
    path: '/busca',
    name: 'search',
    component: SearchView,  // Aqui deve estar a referência para o componente de busca
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,  // Definindo as rotas
});

export default router;