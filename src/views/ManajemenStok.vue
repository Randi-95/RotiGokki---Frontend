<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const stockList = ref([]);
const allOutlets = ref([]);
const selectedOutletId = ref('');
const isLoading = ref(false);
const error = ref(null);

const adminUser = computed(() => {
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

const fetchAllOutlets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/outlets/list-all`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } 
    });
    allOutlets.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil daftar outlet:', err);
    Swal.fire('Error', 'Gagal mengambil daftar outlet.', 'error');
  }
};

const fetchStockData = async () => {
  let outletToFetch = '';

  if (adminUser.value.role === 'superadmin') {
    outletToFetch = selectedOutletId.value;
  } else if (adminUser.value.role === 'admin_outlet') {
    outletToFetch = adminUser.value.outlet_id;
  }

  if (!outletToFetch) {
    stockList.value = [];
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`${API_BASE_URL}/stok`, {
      params: {
        outlet_id: outletToFetch
      },
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } 
    });

    stockList.value = response.data;

  } catch (err) {
    console.error('Gagal mengambil data stok:', err);
    error.value = 'Gagal memuat data stok.';
  } finally {
    isLoading.value = false;
  }
};

const handleSaveStock = async () => {
  let outletToSave = '';
  if (adminUser.value.role === 'superadmin') {
    outletToSave = selectedOutletId.value;
  } else if (adminUser.value.role === 'admin_outlet') {
    outletToSave = adminUser.value.outlet_id;
  }

  if (!outletToSave) {
    return Swal.fire('Error', 'Outlet tidak valid.', 'error');
  }

  isLoading.value = true;

  const payload = {
    outlet_id: outletToSave,
    updates: stockList.value.map(item => ({
      product_id: item.product_id,
      stok: item.stok
    }))
  };

  try {
    await axios.post(`${API_BASE_URL}/stok`, payload, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } 
    });

    Swal.fire('Berhasil!', 'Stok telah berhasil diperbarui.', 'success');

  } catch (err) {
    console.error('Gagal menyimpan stok:', err.response.data);
    const errorMsg = err.response?.data?.message || err.response?.data || 'Terjadi kesalahan di server.';
    Swal.fire('Gagal', errorMsg, 'error');
  } finally {
    isLoading.value = false;
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const router = useRouter()

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

onMounted(() => {
  if (adminUser.value.role === 'superadmin') {
    fetchAllOutlets();
  } else if (adminUser.value.role === 'admin_outlet') {
    fetchStockData();
  } else {
    error.value = "Anda tidak memiliki akses ke halaman ini.";
  }

  console.log(adminUser)
});
</script>


<template>
   <div class="">
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
            <button 
              @click="closeSidebar" 
              class="lg:hidden absolute top-5 right-4 text-white hover:text-gray-200"
              aria-label="Tutup menu"
            >
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
              <Icon icon="ic:outline-shopping-bag" class="text-xl"/>
              <h2 class="font-medium text-[16px]">Manajemen Stok</h2>
            </RouterLink>

            <RouterLink to="/dashboard-pesanan"  @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
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
    <div class="md:p-8 lg:ml-64">
      <header class="sticky top-0 z-10 bg-white shadow-sm w-full flex items-center justify-between p-4 lg:justify-end">
        <button @click="toggleSidebar" class="lg:hidden text-gray-700 hover:text-gray-900">
          <Icon icon="mdi:menu" class="text-3xl" />
        </button>
        <h1 class="lg:hidden font-fredokaone text-[#0F4B7D] font-normal text-2xl absolute left-1/2 -translate-x-1/2">
          Dashboard
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">Selamat datang, {{ adminUser.name }}</p>
      </header>
      <h1 class="text-2xl font-poppins font-bold text-[#333333] mb-6">
        Manajemen Stok Produk
      </h1>
      <div v-if="adminUser.role === 'superadmin'" class="mb-6 max-w-sm">
        <label for="outlet-select" class="block text-sm font-medium text-gray-700 mb-2">
          Pilih Outlet untuk Dikelola:
        </label>
        <select 
          id="outlet-select"
          v-model="selectedOutletId"
          @change="fetchStockData"
          class="border border-gray-300 h-12 w-full rounded-md outline-none px-3 text-[#333] font-poppins"
        >
          <option value="">-- Pilih Outlet --</option>
          <option v-for="outlet in allOutlets" :key="outlet.id" :value="outlet.id">
            {{ outlet.nama }}
          </option>
        </select>
      </div>

      <div v-if="isLoading" class="text-center py-10">
        <p class="font-poppins text-gray-500">Memuat data stok...</p>
      </div>

      <div v-else-if="error" class="text-center py-10">
        <p class="font-poppins text-red-600">{{ error }}</p>
      </div>

      <div v-else-if="stockList.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 font-poppins">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produk
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 150px;">
                Stok Saat Ini
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in stockList" :key="item.product_id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.nama_produk }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ item.nama_kategori }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input 
                  type="number" 
                  v-model.number="item.stok"
                  min="0"
                  class="w-24 border border-gray-300 rounded-md outline-none px-3 py-2 text-[#333]"
                  :disabled="adminUser.role === 'superadmin'"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-6 text-right">
          <button 
            @click="handleSaveStock"
            v-if="adminUser.role === 'admin_outlet'"
            :disabled="isLoading"
            class="bg-primary text-white font-poppins font-semibold py-2 px-6 rounded-md hover:bg-opacity-90 disabled:bg-gray-400"
          >
            {{ isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>

      </div>

      <div v-else-if="!isLoading && (selectedOutletId || adminUser.role === 'admin_outlet')" class="text-center py-10">
        <p class="font-poppins text-gray-500">Tidak ada produk ditemukan untuk outlet ini.</p>
      </div>
      
    </div>
  </div>
</template>
