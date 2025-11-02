<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const backendUrl = 'http://127.0.0.1:8000';
const categories = ref([]);
const productsByCategory = ref({});
const loadingStates = ref({});
const errorStates = ref({});
const router = useRouter()

const fetchPaginatedProducts = async (url, categoryId) => {
  if (!url) return;

  loadingStates.value[categoryId] = true;
  errorStates.value[categoryId] = null;

  try {
    const response = await axios.get(url);
    productsByCategory.value[categoryId] = {
      data: response.data.data,
      pagination: response.data, 
    };
  } catch (error) {
    console.error(`Gagal memuat produk untuk kategori ${categoryId}:`, error);
    errorStates.value[categoryId] = 'Gagal memuat produk.';
  } finally {
    loadingStates.value[categoryId] = false;
  }
};

onMounted(async () => {
  try {
    const categoryRes = await axios.get(`${backendUrl}/api/kategori`);
    categories.value = categoryRes.data.data;

    const initialProductFetches = categories.value.map(category => {
      loadingStates.value[category.id] = true; 
      const initialUrl = `${backendUrl}/api/kategori/${category.id}/products`;
      return fetchPaginatedProducts(initialUrl, category.id);
    });

    await Promise.all(initialProductFetches);

  } catch (error) {
    console.error("Gagal memuat kategori:", error);
  }
});

const formatRupiah = (value) => {
  if(!value) return 0;

  return value.toLocaleString('id-ID')
}

const goToDetail = (id) => {
  router.push(`/products/${id}`)
}


</script>

<template>
  <div v-for="category in categories" :key="category.id" class="mb-20 px-6">
    <div class="mt-20 px-10">
      <h1 class="font-poppins text-xl font-semibold">{{ category.name }}</h1>
    </div>

    <div v-if="loadingStates[category.id]" class="text-center py-10">
      <p>Memuat produk {{ category.name }}...</p>
    </div>

    <div v-else-if="errorStates[category.id]" class="text-center py-10 text-red-500">
      <p>{{ errorStates[category.id] }}</p>
    </div>

    <div v-else-if="productsByCategory[category.id]?.data.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-10">
        <div 
          v-for="product in productsByCategory[category.id].data" 
          :key="product.id"
          class="flex flex-col relative py-4 shadow-lg rounded-3xl mt-10 bg-white transition hover:-translate-y-1 hover:shadow-xl w-full max-w-[400px] sm:max-w-[230px] mx-auto cursor-pointer"
          @click="goToDetail(product.id)"
        >
          <img :src="`${backendUrl}${product.image_url}`" alt="Roti Gokki" class="w-[300px] sm:w-[180px] lg:w-[200px] -translate-y-6 mx-auto rounded-lg"/>
          <div class="px-4 text-left">
            <h1 class="text-[#333333] font-fredokaone font-medium text-2xl ">{{ product.nama }}</h1>
            <p class="font-poppins text-[10px] teks-md text-gray-600 h-12 overflow-hidden">{{ product.deskripsi }}</p>
          </div>
          <div class="flex items-center w-full mt-4 px-4 justify-between">
            <p class="font-bold font-poppins text-xl">Rp. {{ formatRupiah(product.price) }}</p>
            <div class="w-[40px] h-[38px] sm:w-[50px] sm:h-[46px] bg-pink flex items-center button-keranjang justify-center p-2 absolute right-0 bottom-0">
              <Icon icon="icon-park-outline:shopping" class="text-white w-5 h-5 sm:w-6 sm:h-6"/>
            </div>
          </div>
        </div>
      </div>

      <div v-if="productsByCategory[category.id]?.pagination?.links.length > 3" class="mt-10 flex justify-center items-center gap-x-1 sm:gap-x-2 text-sm">
        <button
          v-for="(link, index) in productsByCategory[category.id].pagination.links"
          :key="index"
          @click="fetchPaginatedProducts(link.url, category.id)"
          :disabled="!link.url"
          :class="[
            'px-3 py-1.5 rounded-md border transition-colors duration-200',
            { 
              'bg-blue-600 text-white border-blue-600': link.active,
              'bg-white border-gray-300 hover:bg-gray-50': !link.active && link.url,
              'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200': !link.url
            }
          ]"
          v-html="link.label"
        ></button>
      </div>
    </div>
     <div v-else class="text-center py-10">
      <p>Tidak ada produk dalam kategori ini.</p>
    </div>
  </div>
</template>

<style scoped>
.button-keranjang {
  border-radius: 1.5rem 0 1.5rem 0;
}
</style>