<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      email: email.value,
      password: password.value,
    });


    localStorage.setItem('authToken', response.data.authToken);

    router.push('/dashboard');

  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = Swal.fire({
        title: "Gagal",
        text: error.response.data.message,
        icon: 'error'
    });
    } else {
      errorMessage.value = Swal.fire({
        title: "Gagal",
        text: "Terjadi Kesalahan Pada server",
        icon: 'error'
    })
    }
    console.error('Login failed:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>


<template>
    <div class="h-screen w-screen bg-primary relative">
        <div class="lg:w-[70%] h-full mx-auto bg-white px-10 flex flex-col justify-center">
            <div class="flex justify-center">
                <img src="/public/Logo.png" alt="" class="h-40 w-40">
            </div>
                <h2 class="text-4xl font-bold text-primary font-poppins text-gokki-blue text-center mb-8">Login</h2>
            
            <form @submit.prevent="handleLogin">


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
                                    v-model="email" 
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
                                    class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gokki-blue focus:border-transparent transition duration-150"
                                    required
                                    v-model="password"
                                >
                            </div>
                    </div>

                    <div class="flex justify-end">
                        <button 
                            type="submit" 
                            class="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gokki-blue focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            :disabled="isLoading"
                        >
                            {{ isLoading ? 'Loading...' : 'Login' }}
                        </button>
                    </div>
                </form>
        </div>

        <img src="/public/maskot_login.png" alt="" class="absolute lg:block w-70 bottom-0 hidden">
    </div>
</template>

