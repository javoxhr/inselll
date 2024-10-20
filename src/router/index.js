<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import HomeViews from '@/views/HomeViews.vue';
import about from '@/views/about.vue';
import signUp from '@/views/signUp.vue';
import { useStore } from '@/stores/counter';
=======
import { createRouter, createWebHistory } from 'vue-router'
import HomeViews from '@/views/HomeViews.vue'
import about from '@/views/about.vue'
import taminot from "@/views/taminot.vue"
>>>>>>> 1870d794aa5a3b6643a9fb322440a7047aae2ed4

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
<<<<<<< HEAD
      path: '/signUp',
      name: 'signUp',
      component: signUp
=======
      path: '/taminot',
      name: 'taminot',
      component: taminot
>>>>>>> 1870d794aa5a3b6643a9fb322440a7047aae2ed4
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
