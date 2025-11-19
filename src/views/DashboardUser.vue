<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/vue';
import { RouterLink, useRouter } from 'vue-router';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const isSidebarOpen = ref(false);
const users = ref([]);
const paginationData = ref(null);
const searchQuery = ref('');
const selectedOutletId = ref('');
const allOutlets = ref([]);
const isLoading = ref(true);
const error = ref(null);
const showAddModal = ref(false);
const isSubmitting = ref(false);
const debounceTimer = ref(null);

const router = useRouter();

const newUser = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  outlet_id: ''
});

const adminUser = computed(() => {
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/');
    return null;
  }
  return { 'Authorization': `Bearer ${token}` };
};

const fetchOutlets = async () => {
  const headers = getAuthHeaders();
  if (!headers) return;
  try {
    const response = await axios.get(`${API_BASE_URL}/outlets/list-all`, { headers });
    allOutlets.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil data outlet:', err);
    Swal.fire('Gagal', 'Tidak dapat memuat data outlet.', 'error');
  }
};

const fetchUsers = async (page = 1) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  isLoading.value = true;
  error.value = null;

  try {
    const params = new URLSearchParams({ page });
    if (searchQuery.value) params.append('search', searchQuery.value);
    if (selectedOutletId.value) params.append('outlet_id', selectedOutletId.value);

    const response = await axios.get(`${API_BASE_URL}/admin/users?${params.toString()}`, { headers });
    users.value = response.data.data;
    paginationData.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil data user:', err);
    error.value = err.response?.data?.message || 'Gagal memuat data user.';
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  newUser.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    outlet_id: ''
  };
};

const handleAddUser = async () => {
  if (newUser.value.password !== newUser.value.confirmPassword) {
    return Swal.fire('Perhatian', 'Konfirmasi password tidak sama.', 'warning');
  }

  const headers = getAuthHeaders();
  if (!headers) return;

  isSubmitting.value = true;
  try {
    await axios.post(`${API_BASE_URL}/admin/users`, {
      name: newUser.value.name,
      email: newUser.value.email,
      password: newUser.value.password,
      outlet_id: newUser.value.outlet_id,
    }, { headers });

    Swal.fire('Berhasil', 'Akun admin outlet berhasil dibuat.', 'success');
    showAddModal.value = false;
    resetForm();
    fetchUsers(paginationData.value?.current_page || 1);
  } catch (err) {
    console.error('Gagal menambahkan user:', err);
    const msg = err.response?.data?.message || 'Terjadi kesalahan saat menambahkan user.';
    Swal.fire('Gagal', msg, 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDeleteUser = (user) => {
  Swal.fire({
    title: 'Hapus akun?',
    text: `Hapus akses admin ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, hapus',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(user);
    }
  });
};

const deleteUser = async (user) => {
  const headers = getAuthHeaders();
  if (!headers) return;

  try {
    await axios.delete(`${API_BASE_URL}/admin/users/${user.id}`, { headers });
    Swal.fire('Berhasil', 'Akun berhasil dihapus.', 'success');
    const currentPage = paginationData.value?.current_page || 1;
    fetchUsers(currentPage);
  } catch (err) {
    console.error('Gagal menghapus user:', err);
    const msg = err.response?.data?.message || 'Terjadi kesalahan saat menghapus user.';
    Swal.fire('Gagal', msg, 'error');
  }
};

const changePage = (page) => {
  const pageNumber = Number(page);
  if (!paginationData.value || pageNumber < 1 || pageNumber > paginationData.value.last_page) {
    return;
  }
  fetchUsers(pageNumber);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const handleLogout = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/');
    return;
  }

  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Gagal logout dari server:', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('data_admin_saya');
    router.push('/');
  }
};

watch([searchQuery, selectedOutletId], () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(() => fetchUsers(1), 500);
});

onMounted(() => {
  if (adminUser.value.role !== 'superadmin') {
    router.replace('/dashboard-stok');
    return;
  }
  fetchOutlets();
  fetchUsers();
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
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Manajemen User</h1>
            <p class="text-gray-500">Kelola akun admin outlet pada platform RotiGokki.</p>
          </div>
          <button @click="showAddModal = true" class="bg-[#0F4B7D] hover:bg-[#0c3a63] text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors">
            + Tambah User
          </button>
        </div>

        <div class="bg-white rounded-xl shadow p-5 mb-6 grid gap-4 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Cari User</label>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Nama atau email..."
              class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Filter Outlet</label>
            <select 
              v-model="selectedOutletId"
              class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]"
            >
              <option value="">Semua Outlet</option>
              <option v-for="outlet in allOutlets" :key="outlet.id" :value="outlet.id">
                {{ outlet.nama }}
              </option>
            </select>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow overflow-hidden">
          <div v-if="isLoading" class="p-8 text-center text-gray-500">Memuat data user...</div>
          <div v-else-if="error" class="p-8 text-center text-red-500">{{ error }}</div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outlet</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" v-if="users.length">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-gray-900">{{ user.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-700">{{ user.outlet?.nama || '-' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-800">Hapus</button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">Belum ada data user.</td>
                </tr>
              </tbody>
            </table>
            <div v-if="paginationData && paginationData.last_page > 1" class="flex items-center justify-between px-6 py-4 border-t">
              <button @click="changePage(paginationData.current_page - 1)" :disabled="paginationData.current_page === 1" class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50">Sebelumnya</button>
              <p class="text-sm text-gray-600">Halaman {{ paginationData.current_page }} dari {{ paginationData.last_page }}</p>
              <button @click="changePage(paginationData.current_page + 1)" :disabled="paginationData.current_page === paginationData.last_page" class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50">Berikutnya</button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Tambah User Admin Outlet</h2>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:close" class="text-2xl" />
          </button>
        </div>
        <form @submit.prevent="handleAddUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Nama</label>
            <input v-model="newUser.name" type="text" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input v-model="newUser.email" type="email" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Outlet</label>
            <select v-model="newUser.outlet_id" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]">
              <option value="">Pilih Outlet</option>
              <option v-for="outlet in allOutlets" :key="outlet.id" :value="outlet.id">{{ outlet.nama }}</option>
            </select>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input v-model="newUser.password" type="password" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Konfirmasi Password</label>
              <input v-model="newUser.confirmPassword" type="password" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F4B7D]" />
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600">Batal</button>
            <button type="submit" :disabled="isSubmitting" class="px-6 py-2 rounded-lg bg-[#0F4B7D] text-white hover:bg-[#0c3a63] disabled:opacity-50">
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
