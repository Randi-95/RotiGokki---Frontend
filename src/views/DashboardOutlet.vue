<script setup>
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const isSidebarOpen = ref(false);
const tambahOutlet = ref(false);
const editOutlet = ref(false); 
const loading = ref(true);
const error = ref(null);
const router = useRouter()

const backendUrl = 'http://127.0.0.1:8000';
const outlets = ref([]); 
const paginationData = ref(null);

const token = localStorage.getItem('authToken');

const newOutlet = ref({
    nama: '',
    alamat: '',
    city: '',
    jam: '',
    nomor_telepon: null,
    link_map: ''
});

const editingOutlet = ref({
    id: null,
    nama: '',
    alamat: '',
    city: '',
    jam: '',
    nomor_telepon: null,
    link_map: ''
});

const adminUser = computed(() => {
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const closeSidebar = () => isSidebarOpen.value = false;

const fetchOutlets = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
        const response = await axios.get(`${backendUrl}/api/outlets?page=${page}`);
        outlets.value = response.data.data;
        paginationData.value = response.data;
    } catch (err) {
        error.value = err.message;
        console.error('Error fetching outlets:', err);
    } finally {
        loading.value = false;
    }
}

const resetForm = () => {
    newOutlet.value = {
        nama: '',
        alamat: '',
        city: '',
        jam: '',
        nomor_telepon: null,
        link_map: ''
    };
};

const addOutlet = async () => {
    if (!newOutlet.value.nama || !newOutlet.value.alamat) {
        alert('Nama outlet dan alamat harus diisi!');
        return;
    }

    try {
        await axios.post(`${backendUrl}/api/outlets`, newOutlet.value, {
          headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        tambahOutlet.value = false;
        fetchOutlets();
        resetForm();
    } catch (err) {
        console.error('Error adding outlet:', err);
        alert('Gagal menambahkan outlet. Cek konsol untuk detail.');
    }
};

const openEditModal = (outlet) => {
    editingOutlet.value = {
        id: outlet.id,
        nama: outlet.nama,
        alamat: outlet.alamat,
        city: outlet.city,
        jam: outlet.jam,
        nomor_telepon: outlet.nomor_telepon,
        link_map: outlet.link_map
    };
    editOutlet.value = true;
};

const updateOutlet = async () => {
    try {
        await axios.put(`${backendUrl}/api/outlets/${editingOutlet.value.id}`, editingOutlet.value, {
          headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        editOutlet.value = false;
        fetchOutlets(paginationData.value?.current_page || 1);
    } catch (err) {
        console.error('Error updating outlet:', err);
        alert('Gagal mengupdate outlet. Cek konsol untuk detail.');
    }
};

const deleteOutlet = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus outlet ini?')) {
        return;
    }
    try {
        await axios.delete(`${backendUrl}/api/outlets/${id}`, {
          headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        fetchOutlets(paginationData.value?.current_page || 1);
    } catch (err) {
        console.error('Error deleting outlet:', err);
        alert('Gagal menghapus outlet. Cek konsol untuk detail.');
    }
};

const changePage = (page) => {
    if (page > 0 && page <= paginationData.value.last_page && page !== paginationData.value.current_page) {
        fetchOutlets(page); 
    }
}

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
    fetchOutlets(1);
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
              <RouterLink to="/dashboard-users" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]" v-if="adminUser.role === 'superadmin'">
                <Icon icon="mdi:account-group" class="text-xl"/>
                <h2 class="font-medium text-[16px]">Manajemen User</h2>
              </RouterLink>
              <RouterLink to="/dashboard-stok" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
              <Icon icon="mdi:cube-outline" class="text-xl"/>
              <h2 class="font-medium text-[16px]">Manajemen Stok</h2>
            </RouterLink>
              <RouterLink to="/dashboard-pesanan" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]">
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
          <h1 class="text-3xl font-bold text-gray-800 hidden lg:block">Manajemen Outlet</h1>
          <button @click="tambahOutlet = true" class="bg-[#0F4B7D] text-white h-10 px-12 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            + Tambah Outlet
          </button>
        </div>

        <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gray-700 uppercase bg-[#DFDFDF]">
                <tr>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">ID</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Nama Outlet</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Alamat</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Kota</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Jam Buka</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Nomor Telepon</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="text-center py-8">Memuat data outlet...</td>
                </tr>
                <tr v-else-if="error">
                    <td colspan="6" class="text-center py-8 text-red-500">Gagal memuat data: {{ error }}</td>
                </tr>
                <tr v-else v-for="outlet in outlets" :key="outlet.id" class="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ outlet.id }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ outlet.nama }}
                  </td>
                  <td class="px-6 py-4 max-w-xs truncate" :title="outlet.alamat">
                    {{ outlet.alamat }}
                  </td>
                  <td class="px-6 py-4">{{ outlet.city }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ outlet.jam }}</td>
                  <td class="px-6 py-4">{{ outlet.nomor_telepon }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <button @click="openEditModal(outlet)" class="font-medium text-blue-600 hover:text-blue-800">
                          <Icon icon="mdi:pencil" class="h-5 w-5" />
                      </button>
                      <button @click="deleteOutlet(outlet.id)" class="font-medium text-red-600 hover:text-red-800">
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

    <div v-if="tambahOutlet" class="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b border-gray-300 p-4">
          <h1 class="text-[#333333] font-poppins font-semibold text-xl">Tambah Outlet</h1>
          <button @click="tambahOutlet = false; resetForm();">
            <Icon icon="mdi:close" class="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <form @submit.prevent="addOutlet">
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nama Outlet</label>
              <input 
                v-model="newOutlet.nama"
                type="text" 
                placeholder="Contoh: Roti Gokki Kemiri" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Alamat</label>
              <input 
                v-model="newOutlet.alamat"
                type="text" 
                placeholder="Alamat lengkap outlet" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Kota</label>
              <input 
                v-model="newOutlet.city"
                type="text" 
                placeholder="Contoh: Sidoarjo" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Jam Buka</label>
              <input 
                v-model="newOutlet.jam"
                type="text" 
                placeholder="Contoh: 06:00 - 08:00" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nomor Telepon</label>
              <input 
                v-model.number="newOutlet.nomor_telepon"
                type="number" 
                placeholder="Contoh: 628123456789" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Link Google Maps</label>
              <input 
                v-model="newOutlet.link_map"
                type="text" 
                placeholder="https://maps.app.goo.gl/..." 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    
    <div v-if="editOutlet" class="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b border-gray-300 p-4">
          <h1 class="text-[#333333] font-poppins font-semibold text-xl">Edit Outlet</h1>
          <button @click="editOutlet = false">
            <Icon icon="mdi:close" class="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <form @submit.prevent="updateOutlet">
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nama Outlet</label>
              <input 
                v-model="editingOutlet.nama"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Alamat</label>
              <input 
                v-model="editingOutlet.alamat"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Kota</label>
              <input 
                v-model="editingOutlet.city"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Jam Buka</label>
              <input 
                v-model="editingOutlet.jam"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Nomor Telepon</label>
              <input 
                v-model.number="editingOutlet.nomor_telepon"
                type="number" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2 text-sm">Link Google Maps</label>
              <input 
                v-model="editingOutlet.link_map"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

