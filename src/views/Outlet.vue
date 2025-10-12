<script setup lang="ts">
import FooterMain from '@/components/FooterMain.vue';
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 w-fit mx-auto gap-x-30 gap-y-16 px-6">
        <div v-for="i in 6" :key="i" class="md:w-70 shadow-xl p-6 w-full rounded-lg">
            <h1 class="font-poppins font-bold text-lg">Outlet Roti <span class="text-pink">Gokki</span> Kutisari</h1>
            <div class="flex flex-col gap-4">
                <div class="flex items-center mt-2 gap-3">
                    <Icon 
                        icon="mdi:location" 
                        class="text-[#757272] w-12 h-12" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">Jl. Kutisari Utara No. 55, Kutisari, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60291</p>
                </div>

                <div class="flex items-center pl-1 gap-3">
                    <Icon 
                        icon="tabler:clock-filled" 
                        class="text-[#757272] w-6 h-6" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">Buka: 07.00 - 20.00</p>
                </div>

                <div class="flex  items-center pl-1 gap-3">
                    <Icon 
                        icon="ic:round-phone" 
                        class="text-[#757272] w-6 h-6" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">0858-5702-7026</p>
                </div>
            </div>

            <div class="flex gap-2 mt-10">
                <div class="bg-primary w-full px-4 py-2 flex gap-2 border border-transparent rounded-sm justify-center">
                    <Icon 
                        icon="fa7-solid:diamond-turn-right" 
                        class="text-white w-6 h-6" 
                    />
                    <h2 class="font-poppins font-bold text-white">Rute</h2>
                </div>
                <div class="bg-transparent w-full px-4 py-2 border border-primary flex gap-2 rounded-sm justify-center">
                    <Icon 
                        icon="meteor-icons:whatsapp" 
                        class="text-primary w-6 h-6" 
                    />
                    <h2 class="font-poppins font-bold text-primary">WhatsApp</h2>
                </div>
            </div>
        </div>
    </div>
    <FooterMain/>
</template>
<style scoped>
    .container-input input::placeholder{
        color: #898787;
        font-weight: 400;
        font-size: 14px;
    }
</style>