<script setup lang="ts">
import JudulOutlet from '@/components/JudulOutlet.vue';
import NavbarMain from '@/components/NavbarMain.vue';
import { Icon } from '@iconify/vue';

</script>

<template>
    <NavbarMain/>
    <JudulOutlet/>
    <div class="mt-20 px-10">
        <div class="shadow-lg py-2 px-4 flex items-center gap-4 font-poppins">
            <div class="border-[1.2px] border-[#C7C7C7]  relative h-[54px] w-3/4 flex items-center rounded-md container-input">
                <input type="text" name="" id="" class="outline-none pl-8 w-full" placeholder="Cari nama jalan atau daerah(e.g Kutisari)">
                <Icon icon="material-symbols:search-rounded" class="text-[#898787] w-6 h-6 absolute bottom-[14px] left-1" />
            </div>
            <div class="container-select">
                <select name="" id="" class="border-[1.2px] border-[#C7C7C7] h-[54px] w-70 rounded-md outline-none px-2 text-[#333] text-[16px] font-semibold font-poppins">
                    <option value="">Semua Kota</option>
                    <option value="">Sidoarjo</option>
                    <option value="">Surabaya</option>
                    <option value="">Tulungagung</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container-input input::placeholder{
        color: #898787;
        font-weight: 400;
        font-size: 14px;
    }
</style>