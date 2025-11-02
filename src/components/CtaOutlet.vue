<template>
    <div class="w-full min-h-screen flex flex-col-reverse lg:flex-row items-center px-6 lg:px-70 bg-white">
        <div class="left-container w-full lg:h-screen flex items-center">
            <div class="text-right mt-10">
                <h1 class="font-fredokaone text-4xl font-normal text-primary mb-3">Pengalaman Langsung dimulai <br class="hidden lg:block"><span class="text-pink">di sini</span></h1>
                <p class="text-[#333333] font-poppins text-xl">Kunjungi outlet terdekat untuk <span class="font-semibold">pengalaman</span> dan <span class="font-semibold">produk terbaik</span></p>
                <router-link to="/outlet" class="bg-[#FEBDE6] font-bold rounded-sm font-poppins text-pink px-3 py-2 mt-6 hover:bg-pink-400 hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg"> Kunjungi Outlet!</router-link>

            </div>
        </div>
        <div class="right-container w-full flex items-center pt-mt-10 lg:mt-0 lg:h-screen">
            <div class="">
                <img src="/public/outletcta.png" alt="">
            </div>
        </div>
    </div>
</template>

