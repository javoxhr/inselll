import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/tailwind.css';

const app = createApp(App);

// Подключаем Pinia и router
app.use(createPinia());
app.use(router);

// Монтируем приложение
app.mount('#app');
