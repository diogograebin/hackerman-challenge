import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Aqui importamos o router configurado

createApp(App)
  .use(router)   // Não se esqueça de registrar o router na aplicação
  .mount('#app');