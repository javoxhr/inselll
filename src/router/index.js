import { createRouter, createWebHistory } from 'vue-router';
import HomeViews from '@/views/HomeViews.vue';
import about from '@/views/about.vue';
import signUp from '@/views/signUp.vue';
import { useStore } from '@/stores/counter';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViews
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  if (store.data?.data) {
    if (to.name === 'signUp') {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    if (to.name !== 'signUp') {
      next({ name: 'signUp' });
    } else {
      next();
    }
  }
});

export default router;
