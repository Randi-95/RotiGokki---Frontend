<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const hasShadow = ref(false)

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})


const handleScroll = () => {
  hasShadow.value = window.scrollY > 10 
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="fixed top-0 right-0 left-0 bg-white z-50 transition-shadow duration-300"
    :class="{ 'shadow-lg': hasShadow }"
  >
    <div
      v-if="isOpen"
      class="bg-[rgba(0,0,0,0.6)] h-screen w-screen fixed top-0 left-0 z-40"
      @click="isOpen = false"
    ></div>

    <div
      class="flex items-center relative bg-white w-full px-6 lg:w-4/5 justify-between mx-auto font-poppins"
    >
      <RouterLink to="/">
        <img src="/public/Logo.png" alt="logo" class="w-26" />
      </RouterLink>

      <div class="hidden lg:block">
        <div class="flex gap-12 font-medium text-sm">
          <RouterLink to="/" class="text-[#484848]" active-class="text-primary font-bold">Beranda</RouterLink>
          <RouterLink to="/produk" class="text-[#484848]" active-class="text-primary font-bold">Produk</RouterLink>
          <RouterLink to="/outlet" class="text-[#484848]" active-class="text-primary font-bold">Outlet</RouterLink>
          <RouterLink to="/kemitraan" class="text-[#484848]" active-class="text-primary font-bold">Kemitraan</RouterLink>
        </div>
      </div>

      <div class="lg:flex hidden items-center gap-4">
        <RouterLink to="/keranjang">
          <img src="/public/Vector.svg" alt="" class="bg-[#ECE8E8] p-2 rounded-sm" />
        </RouterLink>
        <RouterLink
          to=""
          class="bg-primary text-white px-6 py-3 font-medium rounded-md flex items-center justify-center"
        >
          <p class="text-xs">Hubungi Kami</p>
        </RouterLink>
      </div>

      <transition name="slide">
        <div
          v-if="isOpen"
          class="fixed z-50 left-0 top-0 p-2 h-screen bg-white shadow-lg w-3/4 flex gap-10 flex-col overflow-y-auto"
        >
          <div>
            <div class="flex items-center justify-between border-b mb-10 border-gray-300 px-2">
              <img src="/public/Logo.png" alt="" class="w-28" />
              <button class="cursor-pointer" @click="isOpen = false">
                <Icon icon="material-symbols:close" class="text-black w-6 h-6" />
              </button>
            </div>

            <div class="px-4">
              <div class="flex flex-col gap-6 font-medium">
                <RouterLink to="/" class="text-[#484848]" active-class="text-primary font-bold">Beranda</RouterLink>
                <RouterLink to="/produk" class="text-[#484848]" active-class="text-primary font-bold">Produk</RouterLink>
                <RouterLink to="/outlet" class="text-[#484848]" active-class="text-primary font-bold">Outlet</RouterLink>
                <RouterLink to="/kemitraan" class="text-[#484848]" active-class="text-primary font-bold">Kemitraan</RouterLink>
              </div>
            </div>
          </div>

          <div class="lg:hidden flex items-center gap-4 pt-4 border-t border-gray-300 px-2">
            <RouterLink
              to=""
              class="bg-primary w-full text-white px-6 py-3 font-medium rounded-md flex gap-2 items-center justify-center"
            >
              <Icon icon="line-md:phone" class="text-white w-6 h-6" />
              <p class="text-xs">Hubungi Kami</p>
            </RouterLink>
            <RouterLink to="/keranjang">
              <Icon icon="icon-park-outline:shopping" class="text-black w-10 h-10 bg-gray-300 p-2 rounded-md" />
            </RouterLink>
          </div>
        </div>
      </transition>

      <div class="lg:hidden flex items-center gap-2">
        <RouterLink to="" class="p-2 rounded-sm">
          <Icon icon="icon-park-outline:shopping" class="text-black w-5 h-5" />
        </RouterLink>
        <button class="cursor-pointer" @click="isOpen = !isOpen">
          <Icon icon="material-symbols:menu" class="text-black w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
