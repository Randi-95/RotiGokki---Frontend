<script setup>
    import { Icon } from '@iconify/vue';
import { ref } from 'vue';
    const isOpen = ref(true)
</script>



<template>
    <div class="fixed top-0 right-0 left-0">
        <div class="bg-[rgba(0,0,0,0.6)] h-screen w-screen absolute top-0 z-20" v-if="isOpen" @click="isOpen = false">
        </div>
        <div class="flex items-center absolute lg:relative bg-white w-full px-6 lg:w-4/5  justify-between mx-auto font-poppins">
                <div class="">
                    <img src="/public/Logo.png" alt="" class="w-28">
                </div>
                <div class="hidden lg:block">
                    <div class="flex gap-12 font-medium text-sm text-[#484848]">
                        <RouterLink to="" class="font-bold text-primary">Beranda</RouterLink>
                        <RouterLink to="">Produk</RouterLink>
                        <RouterLink to="">Outlet</RouterLink>
                        <RouterLink to="">Kemitraan</RouterLink>
                    </div>
                </div>

                <div class="lg:flex hidden items-center gap-4">
                    <RouterLink to="" class="">
                        <img src="/public/Vector.svg" alt="" class="bg-[#ECE8E8] p-2 rounded-sm">
                    </RouterLink>

                    <RouterLink to="" class="bg-primary text-white px-6 py-3 font-medium rounded-md flex items-center justify-center">
                        <p class="text-xs">Hubungi Kami</p>
                    </RouterLink>
                </div>

                <div class="absolute z-40 left-0 top-0 p-2 h-screen bg-white shadow-lg w-3/4 flex flex-col justify-between" v-if="isOpen">
                    <div class="">
                        <div class="flex items-center justify-between border-b mb-10 border-gray-300">
                            <img src="/public/Logo.png" alt="" class="w-28">
                            <button class="cursor-pointer" @click="isOpen = !isOpen">
                                <Icon icon="material-symbols:close" class="text-black w-6 h-6" />
                            </button>
                        </div>
                        <div class="px-4">
                        <div class="flex flex-col gap-6 font-medium text-sm text-[#484848]">
                            <RouterLink to="" class="font-bold text-primary">Beranda</RouterLink>
                            <RouterLink to="">Produk</RouterLink>
                            <RouterLink to="">Outlet</RouterLink>
                            <RouterLink to="">Kemitraan</RouterLink>
                        </div>
                        </div>
                    </div>

                    <div class="lg:hidden flex items-center gap-4 pt-4 border-t border-gray-300">
                        <RouterLink to="" class="bg-primary w-full text-white px-6 py-3 font-medium rounded-md flex gap-2 items-center justify-center">
                            <Icon icon="line-md:phone" class="text-white w-6 h-6" />
                            <p class="text-xs">Hubungi Kami</p>
                        </RouterLink>
                        <RouterLink to="" class="">
                            <img src="/public/Vector.svg" alt="" class="bg-[#ECE8E8] p-2 rounded-sm">
                        </RouterLink>
                    </div>
                </div>

            <div class="lg:hidden flex items-center gap-2">
                <RouterLink to="" class="bg-gray-200 p-2 rounded-sm">
                    <Icon icon="icon-park-outline:shopping" class="text-black  w-5 h-5" />
                </RouterLink>
                <button class="cursor-pointer" @click="isOpen = !isOpen">
                    <Icon icon="material-symbols:menu" class="text-black w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
</template>

