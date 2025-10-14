<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <div class=" justify-center w-full mb-20 lg:px-10 px-3 flex items-center mt-5">
        <div class="w-full flex flex-col items-center justify-center mt-10 lg:flex-row sm:mb-0 gap-4">
        <div class="flex flex-col order-2 lg:order-1 mb-2 py-1 px-3 mt-4 lg:w-1/2">
                    <p class="text-primary font-normal text-4xl lg:text-5xl font-fredokaone text-left">Paket Lengkap <br> (Rp 1.500.000)</p>
                    <div class="flex py-1 mt-5">
                        <p class="text-xl text-[#333333]">Perlengkapan lebih lengkap + stok lebih banyak untuk bisnis maksimal.</p>
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

            <div class="flex md:flex-row flex-col items-left shadow-lg mt-5 p-3 border border-[#10549490] rounded-lg">
            <details  class="items-left cursor-pointer justify-start delay-75">
                <summary class="flex gap-2 items-center ">
                <Icon icon="carbon:checkmark-outline" class="text-primary w-[28px] h-[28px]" />
                <p class="font-bold text-[#333333]">Booth Stand Eksklusif & Profesional</p>
                </summary>
                <div class="details-content">
                <p class="text-left mt-2 pl-5 max-w-sm">
                    Tampil menonjol dan menarik perhatian pelanggan dengan booth stand eksklusif berdesain modern.
Memberikan kesan profesional sekaligus meningkatkan kepercayaan calon pembeli terhadap produk Gokki.
                </p>
                </div>
            </details>
            </div> 
        </div>                
            <div class="justify-center order-1 items-center flex-col flex lg:w-1/2  sm:order-1 md:order-1 lg:order-1 mb-10 lg:mb-0">
                <img src="/public/MitraLengkap.png" alt="">
            </div>
        </div>
    </div>
</template>