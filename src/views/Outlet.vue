<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FooterMain from '@/components/FooterMain.vue';
import JudulOutlet from '@/components/JudulOutlet.vue';
import NavbarMain from '@/components/NavbarMain.vue';
import { Icon } from '@iconify/vue';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const outletData = ref({
  data: [],
  pagination: null,
});
const cities = ref([]);
const searchQuery = ref('');
const selectedCity = ref('');

const isLoading = ref(false);
const error = ref(null);

const fetchOutlets = async (url = null) => { 
  let endpoint = url || `${API_BASE_URL}/outlets`;
  let params = {};

  if (!url) {
    params = {
      search: searchQuery.value,
      city: selectedCity.value,
    };
  }

  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get(endpoint, { params });
    
    outletData.value = {
      data: response.data.data,
      pagination: response.data,
    };
    
  } catch (err) {
    console.error('Gagal mengambil data outlet:', err);
    error.value = 'Gagal memuat data outlet. Silakan coba lagi nanti.';
  } finally {
    isLoading.value = false;
  }
};

const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    cities.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil data kota:', error);
  }
};

onMounted(() => {
  fetchOutlets();
  fetchCities();
});
</script>

<template>
  <NavbarMain />
  <JudulOutlet />

  <div class="mt-20 px-4 sm:px-6 md:px-10">
    <div class="shadow-lg py-3 px-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 font-poppins">
      
      <div class="border border-[#C7C7C7] relative h-[54px] flex items-center rounded-md w-full md:w-3/4 container-input">
        <input 
          type="text" 
          placeholder="Cari nama jalan atau daerah (e.g Kutisari)"
          class="outline-none pl-10 pr-3 w-full h-full text-[15px] md:text-[16px]" 
          v-model="searchQuery"
          @keyup.enter="fetchOutlets()"
        />
        <Icon 
          icon="material-symbols:search-rounded" 
          class="text-[#898787] w-5 h-5 md:w-6 md:h-6 absolute left-2 bottom-[14px] md:bottom-[15px]" 
        />
      </div>

      <div class="container-select w-full md:w-auto">
        <select 
          class="border border-[#C7C7C7] h-[54px] w-full md:w-70 rounded-md outline-none px-3 text-[#333] text-[15px] md:text-[16px] font-semibold font-poppins"
          v-model="selectedCity"
          @change="fetchOutlets()"
        >
          <option value="">Semua Kota</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <button 
        @click="fetchOutlets()" 
        class="bg-primary text-white font-bold h-[54px] px-6 rounded-md w-full md:w-auto"
      >
        Cari
      </button>
    </div>
  </div>

  <div v-if="isLoading" class="text-center py-20 font-poppins text-gray-500">
    <p>Memuat data outlet...</p>
  </div>

  <div v-else-if="error" class="text-center py-20 font-poppins text-red-500">
    <p>{{ error }}</p>
  </div>
  
  <div v-else>
    <div v-if="outletData.data && outletData.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 w-fit mx-auto gap-x-15 gap-y-16 px-6 mb-10">
        <div v-for="outlet in outletData.data" :key="outlet.id" class="shadow-xl min-h-80 flex flex-col justify-between p-6 w-full rounded-lg">
            <h1 class="font-poppins font-bold text-lg">{{ outlet.nama }}</h1>
            <div class="flex flex-col gap-4">
                <div class="flex items-center mt-2 gap-3">
                    <Icon 
                        icon="mdi:location" 
                        class="text-[#757272] w-12 h-12" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">{{ outlet.alamat }}</p>
                </div>

                <div class="flex items-center pl-1 gap-3">
                    <Icon 
                        icon="tabler:clock-filled" 
                        class="text-[#757272] w-6 h-6" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">Buka: {{ outlet.jam }}</p>
                </div>

                <div class="flex  items-center pl-1 gap-3">
                    <Icon 
                        icon="ic:round-phone" 
                        class="text-[#757272] w-6 h-6" 
                    />
                    <p class="font-poppins text-[#5E5757] text-[14px] leading-5">{{ outlet.nomor_telepon }}</p>
                </div>
            </div>

            <div class="flex gap-2 mt-10">
                <a :href="`${outlet.link_map}`" class="bg-primary w-full px-4 py-2 flex gap-2 border border-transparent rounded-sm justify-center">
                    <Icon 
                        icon="fa7-solid:diamond-turn-right" 
                        class="text-white w-6 h-6" 
                    />
                    <h2 class="font-poppins font-bold text-white">Rute</h2>
                </a>
                <a :href="`https://wa.me/${outlet.nomor_telepon}`" class="bg-transparent w-full px-4 py-2 border border-primary flex gap-2 rounded-sm justify-center">
                    <Icon 
                        icon="meteor-icons:whatsapp" 
                        class="text-primary w-6 h-6" 
                    />
                    <h2 class="font-poppins font-bold text-primary">WhatsApp</h2>
                </a>
            </div>
        </div>
    </div>

    <div v-else class="text-center py-20 font-poppins text-gray-500">
      <p>Outlet tidak ditemukan.</p>
      <p class="text-sm">Silakan coba kata kunci atau kota yang lain.</p>
    </div>

    <div v-if="outletData.pagination && outletData.pagination.links.length > 3" class="mt-10 mb-20 flex justify-center items-center gap-x-1 sm:gap-x-2 text-sm">
      <button
        v-for="(link, index) in outletData.pagination.links"
        :key="index"
        @click="fetchOutlets(link.url)"
        :disabled="!link.url"
        :class="[
          'px-3 py-1.5 rounded-md border transition-colors duration-200',
          { 
            'bg-primary text-white border-primary': link.active,
            'bg-white border-gray-300 hover:bg-gray-100': !link.active && link.url,
            'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200': !link.url
          }
        ]"
        v-html="link.label"
      ></button>
    </div>
  </div>

  <FooterMain />
</template>

<style scoped>
  .container-input input::placeholder {
    color: #898787;
    font-weight: 400;
    font-size: 14px;
  }
</style>
