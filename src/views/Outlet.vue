<script setup lang="ts">
import JudulOutlet from '@/components/JudulOutlet.vue';
import NavbarMain from '@/components/NavbarMain.vue';
import { Icon } from '@iconify/vue';

</script>

<template>
    <NavbarMain/>
    <JudulOutlet/>
    <div class="mt-20 px-4 sm:px-6 md:px-10">
        <div class="shadow-lg py-3 px-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 font-poppins">
            
            <div class="border border-[#C7C7C7] relative h-[54px] flex items-center rounded-md w-full md:w-3/4 container-input">
            <input 
                type="text" 
                placeholder="Cari nama jalan atau daerah (e.g Kutisari)"
                class="outline-none pl-10 pr-3 w-full h-full text-[15px] md:text-[16px]" 
            />
            <Icon 
                icon="material-symbols:search-rounded" 
                class="text-[#898787] w-5 h-5 md:w-6 md:h-6 absolute left-2 bottom-[14px] md:bottom-[15px]" 
            />
            </div>

            <div class="container-select w-full md:w-auto">
            <select 
                class="border border-[#C7C7C7] h-[54px] w-full md:w-70 rounded-md outline-none px-3 text-[#333] text-[15px] md:text-[16px] font-semibold font-poppins"
            >
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