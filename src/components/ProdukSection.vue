<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="w-full flex flex-col items-center">
        <div class="flex flex-col w-full items-center mt-20">
            <div class="bg-[#F9D3DE] font-poppins w-fit mb-2 py-1 px-2 rounded-sm">
            <p class=" text-pink font-medium text-sm">Varian Rasa Roti Gokki</p>
            </div>
            <h1 class="font-fredokaone text-primary text-4xl text-center">Temukan Roti Gokki Pilihanmu</h1>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-20 mt-10">
            <div class="flex flex-col w-[190px] relative py-2 shadow-lg items-center px-6 rounded-4xl">
                <img src="/public/varianrasa.png" alt="" class="w-[200px]">
                <h1 class="text-[#333333] font-fredokaone font-medium">Roti Gokki Go Choco</h1>
                <p class="font-poppins text-[10px]">Lelehan krim cokelat mewah yang lumer tak tertahankan di setiap gigitan.</p>
                <div class="flex items-center w-full mt-4">
                    <p class="font-bold font-poppins">Rp. 3500</p>
                    <div class=" absolute right-0 bottom-0  w-[50px] h-[46px] bg-pink flex items-center button-keranjang justify-center p-2">
                        <Icon icon="icon-park-outline:shopping" class="text-white w-6 h-6" />
                    </div>                    
                </div>
            </div>

            <div class="flex flex-col w-[190px] relative py-2 shadow-lg items-center px-6 rounded-4xl">
                <img src="/public/varianrasa.png" alt="" class="w-[200px]">
                <h1 class="text-[#333333] font-fredokaone font-medium">Roti Gokki Go Choco</h1>
                <p class="font-poppins text-[10px]">Lelehan krim cokelat mewah yang lumer tak tertahankan di setiap gigitan.</p>
                <div class="flex items-center w-full mt-4">
                    <p class="font-bold font-poppins">Rp. 3500</p>
                    <div class=" absolute right-0 bottom-0  w-[50px] h-[46px] bg-pink flex items-center button-keranjang justify-center p-2">
                        <Icon icon="icon-park-outline:shopping" class="text-white w-6 h-6" />
                    </div>                    
                </div>
            </div>

            <div class="flex flex-col w-[190px] relative py-2 shadow-lg items-center px-6 rounded-4xl">
                <img src="/public/varianrasa.png" alt="" class="w-[200px]">
                <h1 class="text-[#333333] font-fredokaone font-medium">Roti Gokki Go Choco</h1>
                <p class="font-poppins text-[10px]">Lelehan krim cokelat mewah yang lumer tak tertahankan di setiap gigitan.</p>
                <div class="flex items-center w-full mt-4">
                    <p class="font-bold font-poppins">Rp. 3500</p>
                    <div class=" absolute right-0 bottom-0  w-[50px] h-[46px] bg-pink flex items-center button-keranjang justify-center p-2">
                        <Icon icon="icon-park-outline:shopping" class="text-white w-6 h-6" />
                    </div>                    
                </div>
            </div>

            <div class="flex flex-col w-[190px] relative py-2 shadow-lg items-center px-6 rounded-4xl">
                <img src="/public/varianrasa.png" alt="" class="w-[200px]">
                <h1 class="text-[#333333] font-fredokaone font-medium">Roti Gokki Go Choco</h1>
                <p class="font-poppins text-[10px]">Lelehan krim cokelat mewah yang lumer tak tertahankan di setiap gigitan.</p>
                <div class="flex items-center w-full mt-4">
                    <p class="font-bold font-poppins">Rp. 3500</p>
                    <div class=" absolute right-0 bottom-0  w-[50px] h-[46px] bg-pink flex items-center button-keranjang justify-center p-2">
                        <Icon icon="icon-park-outline:shopping" class="text-white w-6 h-6" />
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .button-keranjang{
        border-radius: 2rem 0 2rem 0;
    }
</style>