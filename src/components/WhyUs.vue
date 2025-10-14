<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="w-full lg:px-10 px-3 flex items-center">
        <div class="w-full flex flex-col items-center mt-10 lg:flex-row sm:mb-0 gap-4">
            <div class="justify-center items-center flex-col flex lg:w-1/2  sm:order-0 md:order-0 lg:order-0 mb-10 lg:mb-0">
                <img src="/public/why.png" alt="">
            </div>
            <div class="flex flex-col lg:w-1/2  items-center justify-center mt-4 lg:pt-0">
                <div class="py-3 px-5 mb-2 mt-1 justify-start self-start sm:justify-center">
                    <p class="bg-[#F9D3DE] w-fit mb-1 px-12 py-[7px] rounded-md text-pink font-medium font-poppins  md:order-2 sm:order-2">Kenapa RotiGokki?</p>
                </div>
                <div class="flex flex-col items-center text-center mb-2 py-1 px-3">
                    <p class="text-primary font-normal text-4xl lg:text-5xl font-fredokaone text-left">Nikmati rasa terbaik roti lembut & creamy kami.</p>
                </div>
                <div class="">
                    <div class="flex md:flex-row flex-col mb-4 py-1  md:items-center">
                        <div class="p-3 rounded-[18px] bg-[#F9D3DE] max-w-[64px] ml-4 mb-2 md:max-h-[54px] w-fit flex justify-center">
                            <Icon icon="mdi:bread-slice" class="text-[#F12967] w-[28px] h-[28px]"/>
                        </div>
                        <div class="flex flex-col px-3">
                            <h1 class="font-fredokaone px-2 text-[20px] text-[#333333]">Fresh dari Oven Setiap Hari</h1>
                            <p class="font-poppins text-md px-2">Setiap roti dipanggang segar setiap hari untuk menjamin kualitas terbaik.</p>
                        </div>
                    </div>
                    <div class="flex md:flex-row flex-col mb-4 py-1  md:items-center">
                        <div class="p-3 rounded-[18px] bg-[#F9D3DE] max-w-[64px] ml-4 mb-2 md:max-h-[54px] w-fit flex justify-center">
                            <Icon icon="mdi:feather" class="text-[#F12967] w-[28px] h-[28px]"/>
                        </div>
                        <div class="flex flex-col px-3">
                            <h1 class="font-fredokaone px-2 text-[20px] text-[#333333]">Tekstur Lembut & Aroma Menggoda</h1>
                            <p class="font-poppins text-md px-2">Nikmati tekstur lembut dengan aroma khas yang menggugah selera.</p>
                        </div>
                    </div>
                    <div class="flex md:flex-row flex-col mb-4 py-1  md:items-center">
                        <div class="p-3 rounded-[18px] bg-[#F9D3DE] max-w-[64px] ml-4 mb-2 md:max-h-[54px] w-fit flex justify-center">
                            <Icon icon="mdi:hand-coin" class="text-[#F12967] w-[28px] h-[28px]"/>
                        </div>
                        <div class="flex flex-col px-3">
                            <h1 class="font-fredokaone px-2 text-[20px] text-[#333333]">Harga Terjangkau</h1>
                            <p class="font-poppins text-md px-2">Rasakan kelezatan roti berkualitas premium dengan harga yang tetap bersahabat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>