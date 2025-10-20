<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <div class="w-full flex flex-col lg:flex-row py-12 px-3 lg:px-20 "> 
        <div class="lg:w-1/2 flex justify-center items-center">
            <img src="/public/kemitraan.png" alt="Promo Kemitraan Roti Gokki" class="max-h-full object-contain">
        </div>

        <div class="lg:w-1/2 lg:pl-16 pt-2"> 
            <h2 class="text-[#333333] font-fredokaone text-[30px] mb-6 leading-snug"> Bergabung Jadi Mitra Roti <span class="text-primary">Gokki</span>,<br class="hidden lg:block">Nikmati
                <span class="text-pink">Keuntungannya!</span>
            </h2>

            <div class="space-y-2">
                <div class="flex items-start gap-8">
                    <div class="rounded-[18px] text-pink p-5 bg-pink-100 flex justify-center items-center shrink-0">
                        <Icon icon ="solar:box-outline" class="w-7 h-7"></Icon>
                    </div>
                    <div>
                        <h3 class="font-fredokaone text-[#333333] text-xl">Modal Awal 100 Roti Gokki Gratis</h3>
                        <p class="font-poppins text-[16px] text-gray-700">Langsung siap jualan dan raih keuntungan pertama tanpa modal stok.</p>
                    </div>
                </div>

                <div class="flex items-start gap-8">
                    <div class="rounded-[18px] text-pink p-5 bg-pink-100 flex justify-center items-center shrink-0">
                        <Icon icon ="solar:shop-outline" class="w-7 h-7"></Icon>
                    </div>
                    <div>
                        <h3 class="font-fredokaone text-[#333333] text-xl">Booth Stand Eksklusif & Profesional</h3>
                        <p class="font-poppins text-[16px] text-gray-700">Tampil menarik dan bangun kepercayaan pelanggan seketika.</p>
                    </div>
                </div>

                <div class="flex items-start gap-8">
                    <div class="rounded-[18px] text-pink p-5 bg-pink-100 flex justify-center items-center shrink-0">
                        <Icon icon ="oui:line-chart" class="w-7 h-7"></Icon>
                    </div>
                    <div>
                        <h3 class="font-fredokaone text-[#333333] text-xl">X-Banner untuk Promosi Efektif</h3>
                        <p class="font-poppins text-[16px] text-gray-700">Alat marketing efektif untuk menarik lebih banyak pembeli.</p>
                    </div>
                </div>

                <div class="flex items-start gap-8">
                    <div class="rounded-[18px] text-pink p-5 bg-pink-100 flex justify-center items-center shrink-0">
                        <Icon icon ="solar:bag-2-outline" class="w-7 h-7"></Icon>
                    </div>
                    <div>
                        <h3 class="font-fredokaone text-[#333333] text-xl">Seragam Kaos & Celemek (Apron) Eksklusif</h3>
                        <p class="font-poppins text-[16px] text-gray-700">Tunjukkan identitas brand yang kuat dan profesional.</p>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <div class="flex justify-center">
                    <button class="font-fredokaone text-white bg-pink hover:bg-pink-700 transition-colors py-3 px-10 btn-mitra text-xl w-auto">
                        Gabung Sekarang
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn-mitra{
        border-radius: 10px 29px 10px 29px;
    }
</style>