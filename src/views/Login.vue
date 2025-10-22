<script setup>
import { Icon } from '@iconify/vue';
</script>


<template>
    <div class="h-screen w-screen bg-primary relative">
        <div class="lg:w-[70%] h-full mx-auto bg-white px-10 flex flex-col justify-center">
            <div class="flex justify-center">
                <img src="/public/Logo.png" alt="" class="h-40 w-40">
            </div>
                <h2 class="text-4xl font-bold text-primary font-poppins text-gokki-blue text-center mb-8">Login</h2>
            <form>
                    <div class="mb-6">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Icon icon="ic:baseline-email" class=""></Icon>
                            </span>
                            <input 
                                type="email" 
                                placeholder="Masukkan email anda" 
                                class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150"
                                required
                            >
                        </div>
                    </div>

                    <div class="mb-8">
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Icon icon="solar:lock-bold" class=""></Icon>
                            </span>
                            <input 
                                type="password" 
                                placeholder="Password.." 
                                class="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gokki-blue focus:border-transparent transition duration-150"
                                required
                            >
                            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer">
                                <i class="fas fa-eye-slash"></i>
                            </span>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button 
                            type="submit" 
                            class="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gokki-blue focus:ring-opacity-50"
                        >
                            Login
                        </button>
                    </div>
                </form>
        </div>

        <img src="/public/maskot_login.png" alt="" class="absolute lg:block w-70 bottom-0 hidden">
    </div>
</template>

