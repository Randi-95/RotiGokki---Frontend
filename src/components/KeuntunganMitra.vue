<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="px-6 sm:px-10 lg:px-16 py-10">
    <div class="w-full flex flex-col items-center text-center">
      <div class="bg-[#F9D3DE] font-poppins w-fit mb-2 py-1 px-3 rounded-sm">
        <p class="text-pink font-medium text-sm sm:text-base">
          Varian Rasa Roti Gokki
        </p>
      </div>
      <h1 class="font-fredokaone text-primary text-2xl sm:text-3xl lg:text-4xl max-w-3xl">
        Keuntungan Menjadi Mitra Roti Gokki
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 mt-10 mb-10 items-center">
      <div class="flex flex-col items-center lg:items-start">
        <img
          src="/public/fotoCabang.png"
          alt="Foto Cabang"
          class="w-full sm:w-4/5 lg:w-[80%] object-contain block"
        />
        <RouterLink
          to=""
          class="bg-primary text-white py-4 sm:py-5 px-2 mt-6 font-medium font-fredokaone text-lg sm:text-xl flex gap-2 items-center justify-center rounded-[0_20px_20px_20px] w-full sm:w-[80%] text-center shadow-md"
        >
          <p>35+ Mitra Sudah Bergabung</p>
        </RouterLink>
      </div>

      <div class="flex flex-col justify-between gap-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div class="flex items-center gap-4">
            <div class="bg-[#f1296825] w-fit p-4 rounded-[18px]">
              <Icon icon="lucide:store" class="w-6 h-6 text-pink" />
            </div>
            <h1 class="font-poppins font-semibold text-base sm:text-lg text-[#333333]">
              Produk selalu fresh dari pusat
            </h1>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-[#f1296825] w-fit p-4 rounded-[18px]">
              <Icon icon="akar-icons:heart" class="w-6 h-6 text-pink" />
            </div>
            <h1 class="font-poppins font-semibold text-base sm:text-lg text-[#333333]">
              Pendampingan bisnis (training & support)
            </h1>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-[#f1296825] w-fit p-4 rounded-[18px]">
              <Icon icon="ph:video" class="w-6 h-6 text-pink" />
            </div>
            <h1 class="font-poppins font-semibold text-base sm:text-lg text-[#333333]">
              Dukungan promosi digital dari pusat
            </h1>
          </div>

          <div class="flex items-center gap-4">
            <div class="bg-[#f1296825] w-fit p-4 rounded-[18px]">
              <Icon icon="tabler:currency-dollar" class="w-6 h-6 text-pink" />
            </div>
            <h1 class="font-poppins font-semibold text-base sm:text-lg text-[#333333]">
              Tanpa Biaya Royalti
            </h1>
          </div>
        </div>

        <div class="lg:flex flex-col lg:flex-row gap-6 lg:gap-10 items-center hidden">
          <img
            src="/public/fotomitra.png"
            alt="Foto Mitra"
            class="shadow-xl rounded-lg w-full sm:w-3/4 lg:w-1/2 object-cover"
          />
          <div class="flex flex-col justify-between gap-4 text-center lg:text-left">
            <h1 class="font-fredokaone font-normal text-2xl sm:text-3xl lg:text-4xl text-primary">
              Jadilah Bagian dari 35+ Mitra Sukses kami
            </h1>

            <div class="flex flex-col gap-2 items-center lg:items-start">
              <p class="font-poppins text-base sm:text-lg font-medium text-[#333333]">
                Hubungi Kami
              </p>
              <div class="flex items-center">
                <Icon icon="logos:whatsapp-icon" class="w-6 h-6" />
                <p class="font-poppins font-semibold text-sm sm:text-base text-[#333333] ml-2">
                  +62 812-1727-5985
                </p>
              </div>
              <div class="flex items-center">
                <Icon icon="skill-icons:instagram" class="w-6 h-6" />
                <p class="font-poppins font-semibold text-sm sm:text-base text-[#333333] ml-2">
                  @rotigokki
                </p>
              </div>
            </div>

            <RouterLink
              to=""
              class="w-fit font-poppins text-sm sm:text-lg text-white bg-primary font-semibold px-6 py-2 rounded-sm mx-auto lg:mx-0"
            >
              Mulai Bisnis Roti Anda Sekarang
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
