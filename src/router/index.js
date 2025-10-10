import Beranda from '@/views/Beranda.vue'
import Kemitraan from '@/views/Kemitraan.vue'
import Keranjang from '@/views/Keranjang.vue'
import Login from '@/views/Login.vue'
import Outlet from '@/views/Outlet.vue'
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
      path: '/outlet',
      name: 'outlet',
      component: Outlet,
      meta: { layout: 'main' },
    },
    {
      path: '/kemitraan',
      name: 'kemitraan',
      component: Kemitraan,
      meta: { layout: 'main' },
    },
    {
      path: '/keranjang',
      name: 'keranjang',
      component: Keranjang,
      meta: { layout: 'keranjang' },
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
