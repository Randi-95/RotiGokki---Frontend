import Beranda from '@/views/Beranda.vue'
import Kemitraan from '@/views/Kemitraan.vue'
import Keranjang from '@/views/Keranjang.vue'
import Login from '@/views/Login.vue'
import Outlet from '@/views/Outlet.vue'
import Produk from '@/views/Produk.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardBeranda from '@/views/DashboardBeranda.vue'
import ProdukDetail from '@/views/ProdukDetail.vue'
import DashboardProduk from '@/views/DashboardProduk.vue'
import DashboardOutlet from '@/views/DashboardOutlet.vue'
import DashboardPesanan from '@/views/DashboardPesanan.vue'


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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardBeranda,
      meta: { requiresAuth : true }
    },
    {
      path: '/dashboard-produk',
      name: 'dashboard_produk',
      component: DashboardProduk,
      meta: { requiresAuth : true }
    },
    {
      path: '/dashboard-outlet',
      name: 'dashboard_outlet',
      component: DashboardOutlet,
      meta: { requiresAuth : true }
    },
    {
      path: '/dashboard-pesanan',
      name: 'dashboard_pesanan',
      component: DashboardPesanan,
      meta: { requiresAuth : true }
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProdukDetail,
      props: true
    }
  ],
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('authToken');

    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

export default router
