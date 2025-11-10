<script setup>
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const isSidebarOpen = ref(false);
const tambahProduk = ref(false);
const editProduk = ref(false);
const loading = ref(true);
const error = ref(null);

const backendUrl = 'http://127.0.0.1:8000';
const products = ref([]);
const categories = ref([]);
const paginationData = ref(null);

const token = localStorage.getItem('authToken');

const newProduct = ref({
    nama: '',
    deskripsi: '',
    price: null,
    stock: null,
    category_id: '',
    image: null
});

const editingProduct = ref({
    id: null,
    nama: '',
    deskripsi: '',
    price: null,
    stock: null,
    category_id: '',
    image: null,
    current_image_url: ''
});

const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const closeSidebar = () => isSidebarOpen.value = false;

const adminUser = computed(() => {
  // (Ini sudah benar, Anda menggunakan 'data_admin_saya')
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

const handleLogout = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/'); 
    return;
  }

  try {
    await axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Gagal logout dari server:", error);
  } finally {
    localStorage.removeItem('authToken');
    router.push('/');
  }
};

const fetchProducts = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
        const response = await axios.get(`${backendUrl}/api/products?page=${page}`);
        products.value = response.data.data;
        paginationData.value = response.data;
    } catch (err) {
        error.value = err.message;
        console.error('Error fetching products:', err);
    } finally {
        loading.value = false;
    }
}

const fetchCategory = async () => {
    try {
        const response = await axios.get(`${backendUrl}/api/kategori`);
        categories.value = response.data.data;
        console.log(response.data.data)
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        newProduct.value.image = file;
    }
};

const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        editingProduct.value.image = file;
    }
};

const resetForm = () => {
    newProduct.value = {
        nama: '',
        deskripsi: '',
        price: null,
        stock: null,
        category_id: '',
        image: null
    };
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.value = '';
    }
};

const addProduct = async () => {
    if (!newProduct.value.category_id) {
        alert('Anda harus memilih kategori produk terlebih dahulu!');
        return;
    }
    const formData = new FormData();
    formData.append('nama', newProduct.value.nama);
    formData.append('deskripsi', newProduct.value.deskripsi);
    formData.append('price', newProduct.value.price);
    formData.append('stock', newProduct.value.stock);
    formData.append('category_id', newProduct.value.category_id);
    if (newProduct.value.image) {
        formData.append('image', newProduct.value.image);
    }

    try {
        await axios.post(`${backendUrl}/api/products`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            
        });
        tambahProduk.value = false;
        fetchProducts();
        resetForm();
    } catch (err) {
        console.error('Error adding product:', err);
        alert('Gagal menambahkan produk. Cek konsol untuk detail.');
    }
};

const openEditModal = (product) => {
    editingProduct.value = {
        id: product.id,
        nama: product.nama,
        deskripsi: product.deskripsi,
        price: product.price,
        stock: product.stock,
        category_id: product.kategori.id,
        image: null,
        current_image_url: `${backendUrl}/storage/${product.image}`
    };
    editProduk.value = true;
};

const updateProduct = async () => {
    const formData = new FormData();
    formData.append('nama', editingProduct.value.nama);
    formData.append('deskripsi', editingProduct.value.deskripsi);
    formData.append('price', editingProduct.value.price);
    formData.append('stock', editingProduct.value.stock);
    formData.append('category_id', editingProduct.value.category_id);
    if (editingProduct.value.image) {
        formData.append('image', editingProduct.value.image);
    }
    
    try {
        await axios.post(`${backendUrl}/api/products/${editingProduct.value.id}`, formData, {
            headers: { 
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
             }
        });
        editProduk.value = false;
        fetchProducts(paginationData.value?.current_page || 1);
    } catch (err) {
        console.error('Error updating product:', err);
        alert('Gagal mengupdate produk. Cek konsol untuk detail.');
    }
};

const deleteProduct = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        return;
    }
    try {
        await axios.delete(`${backendUrl}/api/products/${id}`, {
          headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchProducts(paginationData.value?.current_page || 1);
    } catch (err) {
        console.error('Error deleting product:', err);
        alert('Gagal menghapus produk. Cek konsol untuk detail.');
    }
};

const changePage = (page) => {
    if (page > 0 && page <= paginationData.value.last_page && page !== paginationData.value.current_page) {
        fetchProducts(page);
    }
}

onMounted(() => {
    fetchProducts(1);
    fetchCategory();
});
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 font-poppins">
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 bg-[#0F4B7D] text-white transition-transform duration-300 ease-in-out',
        'lg:translate-x-0', 
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full' 
      ]"
    >
        <div class="flex flex-col py-2 h-full justify-between">
          <div>
            <div class="flex w-full justify-center items-center border-b border-white/20 py-6 relative">
              <h1 class="font-fredokaone text-white font-normal text-3xl">RotiGokki</h1>
              <button @click="closeSidebar" class="lg:hidden absolute top-5 right-4 text-white hover:text-gray-200">
                <Icon icon="mdi:close" class="text-2xl" />
              </button>
            </div>
            <div class="px-4 flex-col flex gap-1 mt-10">
              <RouterLink to="/dashboard" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins" v-if="adminUser.role === 'superadmin'">
                <Icon icon="material-symbols:dashboard-outline-rounded" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Dashboard</h2>
              </RouterLink>
              <RouterLink to="/dashboard-produk" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]" v-if="adminUser.role === 'superadmin'">
                <Icon icon="gridicons:product" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Manajemen Produk</h2>
              </RouterLink>
              <RouterLink to="/dashboard-outlet" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]" v-if="adminUser.role === 'superadmin'">
                <Icon icon="solar:shop-outline" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Manajemen Outlet</h2>
              </RouterLink>
              <RouterLink to="/dashboard-stok" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
                <Icon icon="mdi:cube-outline" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Manajemen Stok</h2>
              </RouterLink>
              <RouterLink to="/dashboard-pesanan" @click="closeSidebar"  active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
                <Icon icon="ic:outline-shopping-bag" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Pesanan</h2>
              </RouterLink>
            </div>
          </div>
          <div class="px-4 pb-4">
            <div @click="handleLogout" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
              <Icon icon="material-symbols:logout-rounded" class="text-xl"/>
              <h2 class="font-medium text-[16px]">Keluar</h2>
            </div>
          </div>
        </div>
    </aside>

    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 z-20 bg-black/50 lg:hidden"></div>

    <div class="lg:ml-64 flex flex-col min-h-screen">
      <header class="sticky top-0 z-10 bg-white shadow-sm flex items-center justify-between p-4 lg:justify-end">
        <button @click="toggleSidebar" class="lg:hidden text-gray-700 hover:text-gray-900">
          <Icon icon="mdi:menu" class="text-3xl" />
        </button>
        <h1 class="lg:hidden font-fredokaone text-[#0F4B7D] font-normal text-2xl absolute left-1/2 -translate-x-1/2">
          Dashboard
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">Selamat datang, {{ adminUser.name }}</p>
      </header>

      <main class="flex-1 p-6 sm:p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 hidden lg:block">Manajemen Produk</h1>
          <button @click="tambahProduk = true" class="bg-[#0F4B7D] text-white h-10 px-12 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            + Tambah Produk
          </button>
        </div>

        <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gray-700 uppercase bg-[#DFDFDF]">
                <tr>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Foto</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Nama Produk</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Kategori</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Harga</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center py-8">Memuat data produk...</td>
                </tr>
                <tr v-else-if="error">
                    <td colspan="6" class="text-center py-8 text-red-500">Gagal memuat data: {{ error }}</td>
                </tr>
                <tr v-else v-for="product in products" :key="product.id" class="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td class="p-4">
                    <img :src="`${backendUrl}/storage/${product.image}`" :alt="product.nama" class="w-12 h-12 rounded-lg object-cover">
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ product.nama }}
                  </td>
                  <td class="px-6 py-4">
                    {{ product.kategori.name }}
                  </td>
                  <td class="px-6 py-4">Rp {{ Number(product.price).toLocaleString('id-ID') }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <button @click="openEditModal(product)" class="font-medium text-blue-600 hover:text-blue-800">
                          <Icon icon="mdi:pencil" class="h-5 w-5" />
                      </button>
                      <button @click="deleteProduct(product.id)" class="font-medium text-red-600 hover:text-red-800">
                          <Icon icon="mdi:delete" class="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="paginationData && paginationData.total > paginationData.per_page" class="flex justify-center items-center p-4">
            <nav class="flex items-center space-x-1">
              <button
                @click="changePage(paginationData.current_page - 1)"
                :disabled="paginationData.current_page === 1"
                class="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo; Previous
              </button>
              <template v-for="link in paginationData.links">
                <button
                  v-if="!isNaN(link.label)"
                  :key="link.label"
                  @click="changePage(link.label)"
                  :class="[
                    'px-4 py-2 text-sm font-medium border rounded-md transition-colors',
                    link.active
                      ? 'bg-[#0F4B7D] text-white border-[#0F4B7D]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  ]"
                >
                  {{ link.label }}
                </button>
              </template>
              <button
                @click="changePage(paginationData.current_page + 1)"
                :disabled="paginationData.current_page === paginationData.last_page"
                class="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &raquo;
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>

    <div v-if="tambahProduk" class="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b border-gray-300 p-4">
          <h1 class="text-[#333333] font-poppins font-semibold text-xl">Tambah Produk</h1>
          <button @click="tambahProduk = false; resetForm();">
            <Icon icon="mdi:close" class="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <form @submit.prevent="addProduct">
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nama Produk</label>
              <input 
                v-model="newProduct.nama"
                type="text" 
                placeholder="Contoh: Roti Cokelat Keju" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Deskripsi</label>
              <input 
                v-model="newProduct.deskripsi"
                type="text" 
                placeholder="Deskripsi singkat produk" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Harga</label>
              <input 
                v-model.number="newProduct.price"
                type="number" 
                placeholder="Contoh: 15000" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Stok</label>
              <input 
                v-model.number="newProduct.stock"
                type="number" 
                placeholder="Contoh: 50" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Kategori Produk</label>
              <select v-model="newProduct.category_id" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option disabled value="">Pilih Kategori</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Foto Produk</label>
              <input 
                @change="handleImageUpload"
                type="file" 
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            <button 
              type="submit"
              class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Tambah
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="editProduk" class="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b border-gray-300 p-4">
          <h1 class="text-[#333333] font-poppins font-semibold text-xl">Edit Produk</h1>
          <button @click="editProduk = false">
            <Icon icon="mdi:close" class="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <form @submit.prevent="updateProduct">
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nama Produk</label>
              <input 
                v-model="editingProduct.nama"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Deskripsi</label>
              <input 
                v-model="editingProduct.deskripsi"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Harga</label>
              <input 
                v-model.number="editingProduct.price"
                type="number" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Stok</label>
              <input 
                v-model.number="editingProduct.stock"
                type="number" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Kategori Produk</label>
              <select v-model="editingProduct.category_id" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option disabled value="">Pilih Kategori</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Foto Produk</label>
              <div class="flex items-center gap-4 mb-2">
                  <img :src="editingProduct.current_image_url" alt="Current Image" class="w-16 h-16 rounded-lg object-cover">
                  <span class="text-xs text-gray-500">Upload file baru untuk mengganti gambar ini.</span>
              </div>
              <input 
                @change="handleEditImageUpload"
                type="file" 
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            <button 
              type="submit"
              class="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

