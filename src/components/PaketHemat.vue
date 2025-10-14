<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <div class="w-full lg:px-10 px-3 flex items-center">
        <div class="w-full flex flex-col items-center mt-10 lg:flex-row sm:mb-0 gap-4">
            <div class="justify-center items-center flex-col flex lg:w-1/2  sm:order-0 md:order-0 lg:order-0 mb-10 lg:mb-0">
                <img src="/public/PromoMitra1.png" alt="">
            </div>
            <div class="lg:w-1/2">     
            <div class="flex flex-col text-center mb-2 py-1 px-3 mt-4">
                <p class="text-primary font-normal text-4xl lg:text-5xl font-fredokaone text-left">Paket Hemat <br> (Rp 600.000)</p>
                <div class="flex md:flex-row flex-col mb-4 py-1 md:items-center mt-5">
                    <p class="text-xl text-[#333333]">Modal kecil dengan perlengkapan dasar untuk mulai usaha.</p>
                </div>
            <div class="flex md:flex-row flex-col items-left shadow-lg mt-5 p-3 border border-[#10549490] rounded-lg">
            <details open class="items-left cursor-pointer justify-start delay-75">
                <summary class="flex gap-2 items-center">
                <Icon icon="carbon:checkmark-outline" class="text-primary w-[28px] h-[28px]" />
                <p class="font-bold text-[#333333]">Modal Awal 30 Roti Gokki Gratis</p>
                </summary>
                <div class="details-content">
                <p class="text-left mt-2 pl-5 max-w-sm">
                    Langsung siap jualan dan raih untung sejak hari pertama tanpa perlu modal untuk stok produk awal
                </p>
                </div>
            </details>
            </div>

            <div class="flex md:flex-row flex-col items-left shadow-lg mt-5 p-3 border border-[#10549490] rounded-lg">
            <details class="items-left cursor-pointer justify-start delay-75">
                <summary class="flex gap-2 items-center">
                <Icon icon="carbon:checkmark-outline" class="text-primary w-[28px] h-[28px]" />
                <p class="font-bold text-[#333333]"> X-Banner untuk Promosi Efektif</p>
                </summary>
                <div class="details-content">
                <p class="text-left mt-2 pl-5 max-w-sm">
                  Menarik perhatian calon pembeli dengan desain profesional.
                  Bantu tingkatkan penjualan sejak hari pertama dengan media promosi yang mudah dipasang di mana saja.
                </p>
                </div>
            </details>
            </div>

            <div class="flex md:flex-row flex-col items-left shadow-lg mt-5 p-3 border border-[#10549490] rounded-lg">
            <details lass="items-left cursor-pointer justify-start delay-75">
                <summary class="flex gap-2 items-center">
                <Icon icon="carbon:checkmark-outline" class="text-primary w-[28px] h-[28px]" />
                <p class="font-bold text-[#333333]">Seragam Kaos Eksklusif</p>
                </summary>
                <div class="details-content">
                <p class="text-left mt-2 pl-5 max-w-sm">
                    Tampil profesional dan percaya diri saat berjualan dengan seragam kaos eksklusif yang nyaman digunakan sepanjang hari.
                </p>
                </div>
            </details>
            </div>

            <div class="flex md:flex-row flex-col items-left shadow-lg mt-5 p-3 border border-[#10549490] rounded-lg">
            <details  class="items-left cursor-pointer justify-start delay-75">
                <summary class="flex gap-2 items-center">
                <Icon icon="carbon:checkmark-outline" class="text-primary w-[28px] h-[28px]" />
                <p class="font-bold text-[#333333]">Celemek (apron) Eksklusif</p>
                </summary>
                <div class="details-content">
                <p class="text-left mt-2 pl-5 max-w-sm">
                    Jaga kebersihan dan tampil lebih rapi saat melayani pelanggan dengan celemek eksklusif berdesain elegan khas Gokki.
                </p>
                </div>
            </details>
            </div> 
            </div>
            </div>
            
        </div>
    </div>
</template>