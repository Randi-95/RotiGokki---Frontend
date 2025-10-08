<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './layout/MainLayout.vue';
import AuthLayout from './layout/AuthLayout.vue';
import Keranjang from './layout/Keranjang.vue';


const layouts = {
    main: MainLayout,
    auth: AuthLayout,
    keranjang: Keranjang
};

const route = useRoute();
const layoutComponent = computed(() => {
  const layoutName = route.meta.layout || 'main';
  return layouts[layoutName];
});
</script>

<template>
  <component :is="layoutComponent" />
</template>