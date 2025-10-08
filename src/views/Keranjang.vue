<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="px-10 py-10 w-screen h-screen">
        <div class="">
            <Icon icon="famicons:arrow-back-sharp" class="w-8 h-8 text-[#333333]"/>
            <h1 class="text-xl font-poppins font-medium text-[#333333] mt-6">Keranjang Belanja Anda</h1>
        </div>

        <div class="flex gap-10">
            <div class="w-1/2 h-120">
                <div class="overflow-x-auto mt-10">
            <table class="w-full border-collapse font-poppins">
                <thead>
                <tr class="text-left border-b">
                    <th class="py-2 px-4 font-medium text-[#333333]">Produk</th>
                    <th class="py-2 px-4 font-medium text-[#333333]">Harga</th>
                    <th class="py-2 px-4 font-medium text-[#333333]">Jumlah</th>
                    <th class="py-2 px-4 font-medium text-[#333333]">Total</th>
                </tr>
                </thead>
                <tbody>
                <!-- <tr>
                    <td class="py-3 px-4 text-gray-700">Contoh Produk 2</td>
                    <td class="py-3 px-4 text-gray-700">Rp15.000</td>
                    <td class="py-3 px-4 text-gray-700">1</td>
                    <td class="py-3 px-4 text-gray-700">Rp15.000</td>
                </tr> -->
                </tbody>
            </table>
            <div class="w-full flex flex-col justify-center items-center h-full mt-38">
                <h1 class="font-poppins text-[#333333] font-semibold text-xl">Keranjang anda masih kosong nih..</h1>
                <p>Roti hangat dan kue manis kami sudah menanti untuk Anda pilih.</p>
                <RouterLink to="" class="font-poppins bg-primary mt-3 text-white font-semibold text-md rounded-xs px-5 py-2">
                    Lihat Menu
                </RouterLink>
            </div>
            </div>

            </div>
            <div class="w-1/2 h-full pt-13">
                <h1 class="font-poppins text-[#333333] font-semibold text-xl">Ringkasan Pemesanan</h1>

                <div class="mt-5">
                    <div class="">
                        <h1 class="font-poppins text-[#333333] font-medium text-md text-lg">Nama Pemesan</h1>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama pemesan"
                            class="mt-2 outline-none w-full h-full text-[15px] md:text-[16px] rounded-sm border py-3 px-2 border-[#cac7c7]" 
                        />

                        <h1 class="font-poppins text-[#333333] font-medium text-md text-lg mt-2">Nomor WhatsApp</h1>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama pemesan"
                            class="mt-2 outline-none w-full h-full text-[15px] md:text-[16px] rounded-sm border py-3 px-2 border-[#cac7c7]" 
                        />

                        <h1 class="font-poppins text-[#333333] font-medium text-md text-lg mt-2">Alamat Pengiriman</h1>
                        <textarea 
                            placeholder="Masukkan nama pemesan"
                            class="mt-2 outline-none w-full h-full text-[15px] md:text-[16px] rounded-sm border py-3 px-2 border-[#cac7c7]" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>