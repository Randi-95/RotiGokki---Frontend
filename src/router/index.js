
import Beranda from '@/views/Beranda.vue'
import Login from '@/views/Login.vue'
import Produk from '@/views/Produk.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Beranda,
      meta: { layout: 'main' },
    },
     {
      path: '/produk',
      name: 'produk',
      component: Produk,
      meta: { layout: 'main' },
    },
     {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: 'auth' },
    },
  ],
})

export default router
