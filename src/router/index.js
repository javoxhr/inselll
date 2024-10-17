import { createRouter, createWebHistory } from 'vue-router'
import HomeViews from '@/views/HomeViews.vue'
import about from '@/views/about.vue'
import taminot from "@/views/taminot.vue"

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
      path: '/taminot',
      name: 'taminot',
      component: taminot
    }
  ]
})

export default router
