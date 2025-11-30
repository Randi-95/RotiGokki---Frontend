<script setup>
import { Icon } from '@iconify/vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const cart = ref([]);
const namaPemesan = ref('');
const nomorWhatsApp = ref('');
const alamatPengiriman = ref('');
const isLoading = ref(false);
const router = useRouter();
const backendUrl = 'http://127.0.0.1:8000';

const categories = ref([]);
const productsByCategory = ref({});
const loadingStates = ref({});
const errorStates = ref({});

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

onMounted(async () => {
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }

  try {
    const categoryRes = await axios.get(`${backendUrl}/api/kategori?limit=2`);
    categories.value = categoryRes.data.data;

    const initialProductFetches = categories.value.map(category => {
      loadingStates.value[category.id] = true;
      const initialUrl = `${backendUrl}/api/kategori/${category.id}/products?limit=6`;
      return fetchPaginatedProducts(initialUrl, category.id);
    });

    await Promise.all(initialProductFetches);

  } catch (error) {
    console.error("Gagal memuat kategori untuk rekomendasi:", error);
  }
});

const fetchPaginatedProducts = async (url, categoryId) => {
  if (!url) return;

  loadingStates.value[categoryId] = true;
  errorStates.value[categoryId] = null;

  try {
    const cartIds = cart.value.map(item => item.id);
    const response = await axios.get(url);
    const filteredData = response.data.data.filter(product => !cartIds.includes(product.id));

    productsByCategory.value[categoryId] = {
      data: filteredData,
      pagination: response.data,
    };
  } catch (error) {
    console.error(`Gagal memuat produk untuk kategori ${categoryId}:`, error);
    errorStates.value[categoryId] = 'Gagal memuat produk.';
  } finally {
    loadingStates.value[categoryId] = false;
  }
};

const goToDetail = (id) => {
  router.push(`/products/${id}`)
}

const quickAddToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    });
  }

  for (const catId in productsByCategory.value) {
    if (productsByCategory.value[catId].data) {
      productsByCategory.value[catId].data = productsByCategory.value[catId].data.filter(p => p.id !== product.id);
    }
  }

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `${product.nama} ditambahkan`,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });
}

watch(cart, (newCartValue) => {
  localStorage.setItem('shoppingCart', JSON.stringify(newCartValue));
}, { deep: true });

const increaseQuantity = (productId) => {
  const item = cart.value.find(p => p.id === productId);
  if (item) {
    item.quantity++;
  }
};

const decreaseQuantity = (productId) => {
  const item = cart.value.find(p => p.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
};

const selectedOutlet = computed(() => {
  const outletString = localStorage.getItem('selectedOutlet');
  if (outletString) {
    try {
      return JSON.parse(outletString);
    } catch (e) {
      console.error("Gagal parse data outlet:", e);
      localStorage.removeItem('selectedOutlet');
      return null;
    }
  }
  return null;
});

const removeItem = (productId) => {
  cart.value = cart.value.filter(p => p.id !== productId);
};

const totalProduk = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const formatRupiah = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const handleCheckout = async () => {
  if (!selectedOutlet.value) {
    Swal.fire({
      title: "Outlet Belum Dipilih",
      text: "Silakan kembali ke halaman outlet dan pilih outlet Anda terlebih dahulu.",
      icon: 'warning'
    });
    return;
  }

  if (!namaPemesan.value || !nomorWhatsApp.value || !alamatPengiriman.value) {
    Swal.fire({
      title: "Data Belum Lengkap",
      text: "Harap lengkapi nama, nomor WhatsApp, dan alamat pengiriman.",
      icon: 'warning'
    });
    return;
  }

  isLoading.value = true;

  const payload = {
    customer_name: namaPemesan.value,
    customer_whatsapp: nomorWhatsApp.value,
    shipping_address: alamatPengiriman.value,
    total_amount: subtotal.value,
    items: cart.value.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    outlet_id: selectedOutlet.value.id
  };

  try {
    const response = await axios.post(`${backendUrl}/api/orders`, payload);

    Swal.fire({
      title: "Pesanan Berhasil",
      text: "Terima kasih atas pesanan Anda. Untuk pembayaran akan kami hubungi via WhatsApp",
      icon: 'success'
    });

    cart.value = [];
    namaPemesan.value = '';
    nomorWhatsApp.value = '';
    alamatPengiriman.value = '';

    localStorage.removeItem('shoppingCart');

  } catch (error) {
    const backendMessage = error.response?.data?.message;
    const isStockIssue = error.response?.status === 422 && backendMessage;

    console.error('Gagal mengirim pesanan:', error.response ? error.response.data : error.message);
    Swal.fire({
      title: isStockIssue ? "Stok Produk Tidak Cukup" : "Oops... Terjadi Kesalahan",
      text: backendMessage || "Gagal membuat pesanan. Pastikan outlet memiliki stok yang cukup.",
      icon: isStockIssue ? 'warning' : 'error'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>


<template>
  <div class="px-6 md:px-10 py-10 min-h-screen">
    <div class="">
      <button @click="goBack">
        <Icon icon="ic:round-arrow-back" class="w-8 h-8 text-[#333333]" />
      </button>
      <h1 class="text-xl font-poppins font-medium text-[#333333] mt-6">Keranjang Belanja Anda</h1>
    </div>

    <div class="flex flex-col lg:flex-row gap-10 mt-8">

      <div class="lg:w-3/5">
        <div class="overflow-x-auto">
          <table v-if="cart.length > 0" class="w-full border-collapse font-poppins">
            <thead>
              <tr class="text-left border-b-2 border-gray-200">
                <th class="py-2 px-4 font-semibold text-[#333333]">Produk</th>
                <th class="py-2 px-4 font-semibold text-[#333333]">Harga</th>
                <th class="py-2 px-4 font-semibold text-[#333333] text-center">Jumlah</th>
                <th class="py-2 px-4 font-semibold text-[#333333]">Total</th>
                <th class="py-2 px-4 font-semibold text-[#333333]"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id" class="border-b">
                <td class="py-4 px-4 text-gray-700 flex items-center gap-x-3">
                  <img :src="`${backendUrl}${item.image_url}`" :alt="item.nama"
                    class="w-16 h-16 object-cover rounded-md hidden sm:block">
                  <span class="font-medium">{{ item.nama }}</span>
                </td>
                <td class="py-4 px-4 text-gray-700">{{ formatRupiah(item.price) }}</td>
                <td class="py-4 px-4 text-gray-700">
                  <div class="flex items-center justify-center gap-x-2">
                    <button @click="decreaseQuantity(item.id)"
                      class="w-6 h-6 rounded-full border hover:bg-gray-100">-</button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item.id)"
                      class="w-6 h-6 rounded-full border hover:bg-gray-100">+</button>
                  </div>
                </td>
                <td class="py-4 px-4 text-gray-700 font-medium">{{ formatRupiah(item.price * item.quantity) }}</td>
                <td class="py-4 px-4">
                  <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500">
                    <Icon icon="mdi:trash-can-outline" class="w-6 h-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else class="w-full flex flex-col justify-center items-center h-full mt-16 text-center">
            <h1 class="font-poppins text-[#333333] font-semibold text-xl">Keranjang anda masih kosong nih..</h1>
            <p class="text-gray-600 mt-2">Roti hangat dan kue manis kami sudah menanti untuk Anda pilih.</p>
            <RouterLink to="/produk"
              class="font-poppins bg-primary mt-4 text-white font-semibold text-md rounded-md px-6 py-2.5 hover:bg-opacity-90">
              Lihat Menu
            </RouterLink>
          </div>
        </div>

        <div class="border-t mt-10 pt-6 product-scroll" v-if="selectedOutlet">
          
          <div v-for="category in categories" :key="category.id" class="mb-8">
            <h2 class="text-xl font-poppins font-semibold mb-4 text-[#333333]">
              {{ category.name }}
            </h2>

            <div v-if="loadingStates[category.id]" class="text-center text-gray-500 py-10">
              <p>Memuat produk {{ category.name }}...</p>
            </div>

            <div v-else-if="errorStates[category.id]" class="text-center py-10 text-red-500">
              <p>{{ errorStates[category.id] }}</p>
            </div>

            <div v-else-if="productsByCategory[category.id]?.data.length > 0">
              <div class="flex overflow-x-auto gap-x-4 pb-4">
              
                <div 
                  v-for="product in productsByCategory[category.id].data" 
                  :key="product.id"
                  class=" rounded-lg shadow-lg bg-white transition hover:shadow-2xl min-w-[190px] max-w-[190px] flex flex-col"
                >
                  <img 
                    :src="`${backendUrl}${product.image_url}`" 
                    alt="Roti Gokki" 
                    class="w-full h-24 object-cover rounded-t-lg cursor-pointer"
                    @click="goToDetail(product.id)"
                  />
                  <div class="p-3 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 
                        class="text-[#333333] font-poppins font-medium text-sm truncate cursor-pointer" 
                        :title="product.nama"
                        @click="goToDetail(product.id)"
                      >
                        {{ product.nama }}
                      </h1>
                      <p class="font-bold font-poppins text-base mt-1">{{ formatRupiah(product.price) }}</p>
                    </div>
                    
                    <button 
                      @click.stop="quickAddToCart(product)" 
                      class="w-full mt-3 bg-primary/10 text-primary text-sm py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>
                </div>
            </div>
          

          </div>

        </div>
        </div>

      <div class="lg:w-2/5 h-full">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="font-poppins text-[#333333] font-semibold text-xl mb-5">Ringkasan Pemesanan</h2>
          <div>
            <form>
              <label for="namaPemesan" class="font-poppins text-[#333333] font-medium text-md">Nama Pemesan</label>
              <input v-model="namaPemesan" id="namaPemesan" type="text" placeholder="Masukkan nama Anda"
                class="mt-2 outline-none w-full text-[15px] rounded-md border py-3 px-3 border-[#cac7c7] focus:border-primary focus:ring-1 focus:ring-primary" />

              <label for="nomorWhatsApp" class="font-poppins text-[#333333] font-medium text-md mt-4 block">Nomor
                WhatsApp</label>
              <input v-model="nomorWhatsApp" id="nomorWhatsApp" type="tel" placeholder="Contoh: 08123456789"
                class="mt-2 outline-none w-full text-[15px] rounded-md border py-3 px-3 border-[#cac7c7] focus:border-primary focus:ring-1 focus:ring-primary" />

              <label for="alamatPengiriman" class="font-poppins text-[#333333] font-medium text-md mt-4 block">Alamat
                Pengiriman</label>
              <textarea v-model="alamatPengiriman" id="alamatPengiriman" placeholder="Masukkan alamat lengkap" rows="3"
                class="mt-2 outline-none w-full text-[15px] rounded-md border py-3 px-3 border-[#cac7c7] focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
            </form>
            <div class="border-t my-5"></div>

            <div class="w-full flex justify-between font-poppins">
              <p class="text-gray-600">Pesanan dari Outlet</p>
              <p class="text-[#333333] font-semibold">
                {{ selectedOutlet ? selectedOutlet.nama : 'Belum Dipilih' }}
              </p>
            </div>

            <div class="w-full flex justify-between font-poppins mt-2">
              <p class="text-gray-600">Jumlah Produk</p>
              <p class="text-[#333333] font-semibold">{{ totalProduk }} item</p>
            </div>

            <div class="w-full flex justify-between font-poppins mt-4">
              <p class="font-semibold text-lg text-[#333333]">Subtotal</p>
              <p class="text-[#333333] font-semibold text-lg">{{ formatRupiah(subtotal) }}</p>
            </div>

            <button @click="handleCheckout" :disabled="isLoading || cart.length === 0 || !selectedOutlet"
              class="bg-primary text-white font-poppins font-semibold w-full py-3 mt-5 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              {{ isLoading ? 'Memproses...' : 'Lanjutkan ke Checkout' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
