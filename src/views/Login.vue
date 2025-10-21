<script setup>
import { Icon } from '@iconify/vue';
</script>


<template>
  <div class="h-screen w-screen grid md:grid-cols-[1fr_max-content_1fr] grid-c">
        
        <div class="hidden md:block bg-primary relative overflow-hidden">
             <div class="absolute bottom-0 right-0 z-10 transform translate-x-1/2 translate-y-1/2">
                <img src="/public/login.png" alt="" class="w-40 h-40">
                    </img>
            </div>
        </div>

        <div class="flex items-center justify-center p-4">
            <div class="w-full max-w-md mx-auto p-8 md:p-12 bg-white rounded-xl shadow-2xl z-20">
                
                <div class="flex justify-center">
                    <img src="/public/Logo.png" alt="" class="h-40 w-40">
                </div>

                <h2 class="text-2xl font-semibold text-gokki-blue text-center mb-8">Login</h2>
                
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
        </div>

        <div class="hidden md:block bg-primary">
            </div>

    </div>
</template>

