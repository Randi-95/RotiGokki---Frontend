<script setup lang="ts">
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const backendUrl = 'http://127.0.0.1:8000'
const products = ref([])
const fetchProducts = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/kategori/1/products')
  console.log(response.data.data)
  products.value = response.data.data
}

onMounted(() => {
  fetchProducts()
}) 

const formatRupiah = (value) => {
  if(!value) return 0;

  return value.toLocaleString('id-ID')
}

const router = useRouter()

const goToDetail = (id) => {
  router.push(`/products/${id}`)
}

</script>

<template>
  <div class="w-full flex flex-col  items-center px-4 py-10 mt-10">
    <div class="flex flex-col items-center text-center mb-10">
      <div class="bg-[#F9D3DE] font-poppins w-fit mb-2 py-1 px-3 rounded-sm">
        <p class="text-pink font-medium text-sm sm:text-base">
          Varian Rasa Roti Gokki
        </p>
      </div>
      <h1 class="font-fredokaone mt-2 text-primary text-2xl sm:text-3xl lg:text-4xl md:w-4/5">
        Temukan Kenikmatan Roti Gokki Pilihanmu
      </h1>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-10"
    >
    <div
      v-for="product in products"
      :key="product.id"
      class="flex flex-col relative py-4 shadow-xl rounded-3xl bg-white transition hover:-translate-y-1 hover:shadow-xl w-full max-w-[280px] sm:max-w-[230px] mx-auto cursor-pointer"
      @click="goToDetail(product.id)"
    >
      <img
        :src="`${backendUrl}${product.image_url}`"
        alt="Roti Gokki"
        class="w-[300px] sm:w-[180px] lg:w-[200px] -translate-y-6 mx-auto"
      />
      <div class="px-4 text-left">
        <h1 class="text-[#333333] font-fredokaone font-medium text-2xl">
          {{ product.nama }}
        </h1>
        <p class="font-poppins text-[10px] teks-md text-gray-600 h-12">
          {{ product.deskripsi }}
        </p>
      </div>

      <div class="flex items-center w-full mt-4 px-4 justify-between">
        <p class="font-bold font-poppins text-xl">Rp. {{ formatRupiah(product.price) }}</p>
        <div
          class="w-[40px] h-[38px] sm:w-[50px] sm:h-[46px] bg-pink flex items-center button-keranjang justify-center p-2 absolute right-0 bottom-0"
        >
          <Icon
            icon="icon-park-outline:shopping"
            class="text-white w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<style scoped>
.button-keranjang {
  border-radius: 1.5rem 0 1.5rem 0;
}
</style>
