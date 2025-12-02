<script setup>
import { computed, onMounted, ref, watch } from 'vue'; 
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import Swal from 'sweetalert2'; // <-- Saya tambahkan ini untuk mengganti alert/confirm

const pesanans = ref([]); 
const paginationData = ref(null);
const loading = ref(true);
const error = ref(null);

const router = useRouter();
const isSidebarOpen = ref(false); 
const statsOrders = ref({}); // <-- Diubah ke Object

const isDetailModalOpen = ref(false);
const selectedPesanan = ref(null);
const detailLoading = ref(false);
const detailError = ref(null);
const selectedStatus = ref('');
const isUpdating = ref(false); 
const updateError = ref(null); 

const searchQuery = ref('');
const filterStatus = ref(''); 
const filterDate = ref('');
let debounceTimer = null; 

const allOutlets = ref([]); 
const filterOutletId = ref('');

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    handleLogout(); 
    return null;
  }
  return { 'Authorization': `Bearer ${token}` };
};
function formatNomor(nomor) {
  if (!nomor) return '';
  return nomor.replace(/^0/, "62");
}

const adminUser = computed(() => {
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

const fetchAllOutlets = async () => {
  if (adminUser.value.role !== 'superadmin') return; 
  try {
    const headers = getAuthHeaders();

    console.log(headers);
    if (!headers) return; 
    
    const response = await axios.get(`http://127.0.0.1:8000/api/outlets/list-all`, { headers });
    allOutlets.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil daftar outlet:', err);
  }
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const formatCurrency = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const getWhatsappMessage = (pesanan) => {
  if (!pesanan) return '';
  const status = (pesanan.status || '').toLowerCase();
  const name = pesanan.customer_name || '';
  const total = formatCurrency(pesanan.total_amount) || 'Rp 0';

  if (status === 'pending') {
    return `Halo Kak ${name}, sekadar mengingatkan pembayaran pesanan Anda di Roti Gokki sebesar ${total}.

Pembayaran bisa ditransfer ke:
Bank BCA: 08993903149 (a/n Roti Gokki)

Ditunggu konfirmasinya agar pesanan bisa langsung kami siapkan. Terima kasih.`;
  }

  if (status === 'proses') {
    return `Halo Kak ${name}, pesanan Anda di Roti Gokki saat ini sedang kami proses.

Mohon ditunggu ya, kami akan segera mengabari jika pesanan sudah siap dikirim/diambil. Terima kasih.`;
  }

  if (status === 'selesai') {
    return `Halo Kak ${name}, pesanan Anda di Roti Gokki telah selesai dan siap dikirim/diambil.

Silakan konfirmasi waktu penerimaan agar pesanan bisa segera kami serahkan. Terima kasih.`;
  }

  return '';
};

const buildWhatsappLink = (pesanan) => {
  if (!pesanan) return '#';
  const message = getWhatsappMessage(pesanan);
  if (!message) return '#';

  return `https://wa.me/${formatNomor(pesanan.customer_whatsapp)}?text=${encodeURIComponent(message)}`;
};

const canContactCustomer = (pesanan) => {
  const status = (pesanan?.status || '').toLowerCase();
  return ['pending', 'proses', 'selesai'].includes(status);
};

const getStatusClass = (status) => {
  if (status === 'Pending') {
    return 'bg-yellow-100 text-yellow-800';
  }
  if (status === 'Selesai') { 
    return 'bg-green-100 text-green-800';
  }
  if (status === 'Proses') { 
    return 'bg-blue-100 text-blue-800';
  }
  if (status === 'Dibatalkan') {
    return 'bg-red-100 text-red-800';
  }
  return 'bg-yellow-100 text-yellow-800';
};

const fetchPesanans = async (page = 1) => {
  loading.value = true;
  error.value = null;
  
  const headers = getAuthHeaders(); 
  if (!headers) {
      loading.value = false;
      error.value = "Autentikasi gagal. Silakan login kembali.";
      return; 
  }
  
  try {
    const params = new URLSearchParams({
      page: page
    });

    if (searchQuery.value) {
      params.append('search', searchQuery.value);
    }
    if (filterStatus.value) {
      params.append('status', filterStatus.value);
    }
    if (filterDate.value) {
      params.append('date', filterDate.value);
    }
    
    // --- BARU: Tambahkan filter outlet jika Superadmin ---
    if (adminUser.value.role === 'superadmin' && filterOutletId.value) {
      params.append('outlet_id', filterOutletId.value);
    }
    // --- AKHIR BARU ---

    const response = await axios.get(`http://127.0.0.1:8000/api/orders?${params.toString()}`, {
      headers: headers // <-- PERBAIKAN 2
    });
    
    pesanans.value = response.data.data;
    paginationData.value = response.data; 
  } catch (err) {
    console.error('Gagal fetch data pesanan:', err);
    error.value = err.response?.data?.message || err.message || 'Gagal mengambil data dari server.';
  } finally {
    loading.value = false;
  }
};

const fetchStatsPesanan = async () => {
  const headers = getAuthHeaders(); 
  if (!headers) return; 
  
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/statistik`, { headers }); // <-- PERBAIKAN 4
    statsOrders.value = response.data;
  } catch (err) {
    console.error('Gagal fetch statistik:', err);
    statsOrders.value = { pesananHariIni: 0, mengungguPembayaran: 0, perluDiProses: 0 };
  }
}
 
const fetchPesananDetails = async (id) => {
  detailLoading.value = true;
  detailError.value = null;
  
  const headers = getAuthHeaders(); // <-- PERBAIKAN 5
  if (!headers) return;
  
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`, { headers }); // <-- PERBAIKAN 6
    selectedPesanan.value = response.data;
    selectedStatus.value = response.data.status; 
  } catch (err) {
    console.error('Gagal fetch detail pesanan:', err);
    detailError.value = 'Gagal memuat detail pesanan.';
  } finally {
    detailLoading.value = false;
  }
};

const openDetailModal = (pesanan) => {
  isDetailModalOpen.value = true;
  fetchPesananDetails(pesanan.id);
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedPesanan.value = null;
  detailError.value = null;
  updateError.value = null; 
};

const updateStatus = async () => {
  if (!selectedPesanan.value) return;

  isUpdating.value = true;
  updateError.value = null;
  const id = selectedPesanan.value.id;
  const newStatus = selectedStatus.value;
  
  const headers = getAuthHeaders(); 
  if (!headers) return;
  
  try {
    await axios.patch(`http://127.0.0.1:8000/api/orders/${id}/status`, {
      status: newStatus
    }, {
      headers: headers 
    });
    
    closeDetailModal();
    fetchPesanans(paginationData.value?.current_page || 1);
    fetchStatsPesanan();
    
  } catch (err) {
    console.error('Gagal update status:', err);
    if (err.response && err.response.data && err.response.data.errors) {
      updateError.value = Object.values(err.response.data.errors).join(', ');
    } else if (err.response && err.response.data && err.response.data.message) {
      updateError.value = err.response.data.message;
    } else {
      updateError.value = 'Gagal memperbarui status. Coba lagi.';
    }
  } finally {
    isUpdating.value = false; 
  }
};

const cancelPesanan = async (pesanan) => {
  const headers = getAuthHeaders(); 
  if (!headers) return;
  
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/pesanan/${pesanan.id}/cancel`, 
      {}, 
      { headers }
    );
    const index = pesanans.value.findIndex(p => p.id === pesanan.id);
    if (index !== -1) {
      pesanans.value[index].status = 'Dibatalkan';
    }
    fetchStatsPesanan();
    Swal.fire('Berhasil', response.data.message || 'Pesanan berhasil dibatalkan.', 'success'); 
  } catch (err) {
    console.error('Gagal membatalkan pesanan:', err);
    const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat membatalkan.';
    Swal.fire('Gagal', `Gagal: ${errorMessage}`, 'error'); 
  }
};

const confirmCancelPesanan = (pesanan) => {
  Swal.fire({
    title: 'Anda yakin?',
    text: `Batalkan pesanan INV-${pesanan.id}? Stok akan dikembalikan.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, batalkan!',
    cancelButtonText: 'Tidak'
  }).then((result) => {
    if (result.isConfirmed) {
      cancelPesanan(pesanan);
    }
  });
};

const changePage = (page) => {
  const pageNumber = Number(page);
  if (isNaN(pageNumber) || pageNumber < 1 || !paginationData.value || pageNumber > paginationData.value.last_page) {
    return;
  }
  fetchPesanans(pageNumber);
};

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
    localStorage.removeItem('data_admin_saya'); 
    router.push('/');
  }
};

onMounted(() => {
  fetchPesanans(); 
  fetchStatsPesanan();
  fetchAllOutlets();
});

watch([searchQuery, filterStatus, filterDate, filterOutletId], () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchPesanans(1); 
  }, 500); 
});

watch(isDetailModalOpen, (isOpen) => {
  if (!isOpen) {
    selectedPesanan.value = null;
    detailError.value = null;
    updateError.value = null; 
  }
});
</script>

<template>
  <div class="relative min-h-screen bg-gray-50 font-poppins">
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-30 w-72 bg-[#0F4B7D] text-white transition-transform duration-300 ease-in-out',
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
            <RouterLink to="/dashboard-kategori" @click="closeSidebar" active-class="bg-[#073B6B]" class="w-full flex gap-2 items-center py-3 rounded-lg px-4 text-white font-poppins hover:bg-[#073B6B]" v-if="adminUser.role === 'superadmin'">
              <Icon icon="mdi:label-multiple" class="text-xl"/>
              <h2 class="font-medium text-[16px]">Manajemen Kategori</h2>
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

    <div class="lg:ml-72 flex flex-col min-h-screen">
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
          <h1 class="text-3xl font-bold text-gray-800 hidden lg:block">Manajemen Pesanan</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-xl shadow p-5 flex items-center gap-5">
            <div  class="rounded-full p-3 flex items-center justify-center bg-[#D9EBFB]">
              <Icon icon="bx:box" class="text-3xl text-blue-800" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Pesanan Hari Ini</p>
              <p class="text-3xl font-bold text-gray-800">{{ statsOrders.pesananHariIni }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow p-5 flex items-center gap-5">
            <div  class="rounded-full p-3 flex items-center justify-center bg-green-100">
              <Icon icon="iconoir:wallet" class="text-3xl text-green-800" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Menunggu Pembayaran</p>
              <p class="text-3xl font-bold text-gray-800">{{ statsOrders.mengungguPembayaran }}</p>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow p-5 flex items-center gap-5">
            <div  class="rounded-full p-3 flex items-center justify-center bg-red-100">
              <Icon icon="hugeicons:package-process-01" class="text-3xl text-red-800" />
            </div>
            <div>
              <p class="text-gray-500 text-sm">Perlu di Proses</p>
              <p class="text-3xl font-bold text-gray-800">{{ statsOrders.perluDiProses }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-4 mb-6">
          <div class="flex flex-col md:flex-row items-center gap-4">
            
            <div class="relative w-full md:flex-grow">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:magnify" class="text-gray-400 text-xl" />
              </div>
               <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Cari ID Pesanan"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>

            <div class="relative w-full md:w-auto">
              <select 
                v-model="filterStatus"
                class="w-full md:w-40 block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm"
              >
                <option value="">Semua Status</option> 
                <option>Proses</option>
                <option>Pending</option>
                <option>Dibatalkan</option>
                <option>Selesai</option>
              </select>
               <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Icon icon="mdi:chevron-down" class="text-xl" />
              </div>
            </div>

            <div class="relative w-full md:w-auto">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon icon="mdi:calendar-blank-outline" class="text-gray-400 text-xl" />
              </div>
              <input 
                type="text" 
                v-model="filterDate"
                onfocus="(this.type='date')"
                onblur="if(!this.value) this.type='text'"
                placeholder="DD / MM / YYYY"
                class="w-full md:w-48 block pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>

            <div v-if="adminUser.role === 'superadmin'" class="relative w-full md:w-auto">
              <select 
                v-model="filterOutletId"
                class="w-full md:w-48 block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm"
              >
                <option value="">Semua Outlet</option>
                <option v-for="outlet in allOutlets" :key="outlet.id" :value="outlet.id">
                  {{ outlet.nama }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Icon icon="mdi:chevron-down" class="text-xl" />
              </div>
            </div>

          </div>
        </div>

        <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gray-700 uppercase bg-[#DFDFDF]">
                <tr>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">ID</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Pembeli</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Tanggal</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">No Telepon</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Total</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Status Pesanan</th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7" class="text-center py-8 text-gray-500">
                    <Icon icon="svg-spinners:ring-resize" class="inline w-6 h-6 mr-2" />
                    Memuat data pesanan...
                  </td>
                </tr>
                <tr v-else-if="error">
                  <td colspan="7" class="text-center py-8 text-red-500">
                    Gagal memuat data: {{ error }}
                  </td>
                </tr>
                <tr v-else-if="pesanans.length === 0">
                  <td colspan="7" class="text-center py-8 text-gray-500">
                    Tidak ada data pesanan yang cocok dengan filter.
                  </td>
                </tr>

                <tr v-else v-for="pesanan in pesanans" :key="pesanan.id" class="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ pesanan.id }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ pesanan.customer_name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ formatDate(pesanan.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ pesanan.customer_whatsapp }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap font-medium">
                    {{ formatCurrency(pesanan.total_amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-3 py-1 text-xs font-semibold rounded-full capitalize"
                      :class="getStatusClass(pesanan.status)"
                    >
                      {{ pesanan.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <button @click="openDetailModal(pesanan)" class="flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800" title="Lihat Detail">
                        <Icon icon="mdi:eye" class="h-5 w-5" />
                        Detail
                      </button>

                      <button 
                        v-if="pesanan.status === 'pending'"
                        @click="confirmCancelPesanan(pesanan)" 
                        class="flex items-center gap-1.5 font-medium text-red-600 hover:text-red-800" 
                        title="Batalkan Pesanan"
                      >
                        <Icon icon="mdi:close-circle-outline" class="h-5 w-5" />
                        Batal
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
                :disabled="!paginationData.prev_page_url"
                class="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo; Previous
              </button>
              <template v-for="link in paginationData.links" :key="link.label">
                <button
                  v-if="!isNaN(link.label)"
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
                <span v-else-if="link.label.includes('...')" class="px-4 py-2 text-sm font-medium text-gray-500">
                  ...
                </span>
              </template>
              <button
                @click="changePage(paginationData.current_page + 1)"
                :disabled="!paginationData.next_page_url"
                class="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &raquo;
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isDetailModalOpen" class="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div class="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div class="flex justify-between items-center border-b border-gray-200 p-5">
          <h1 class="text-gray-800 font-semibold text-xl">Detail Pesanan</h1>
          <button @click="closeDetailModal">
            <Icon icon="mdi:close" class="text-2xl text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <div class="p-6 max-h-[75vh] overflow-y-auto">
          <div v-if="detailLoading" class="text-center py-10">
            <Icon icon="svg-spinners:ring-resize" class="inline w-8 h-8 mr-2 text-gray-500" />
            <p class="text-gray-500">Memuat detail...</p>
          </div>
          <div v-else-if="detailError" class="text-center py-10 text-red-500">
            <p>{{ detailError }}</p>
            <button @click="fetchPesananDetails(selectedPesanan.id)" class="mt-2 text-sm text-blue-600 hover:underline">Coba lagi</button>
          </div>
          <div v-else-if="selectedPesanan">
            <div class="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Nama Pelanggan</label>
                <p class="font-medium text-gray-800">{{ selectedPesanan.customer_name }}</p>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">No Telepon</label>
                <p class="font-medium text-gray-800">{{ selectedPesanan.customer_whatsapp }}</p>
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-1">Alamat</label>
                <p class="font-medium text-gray-800">{{ selectedPesanan.shipping_address }}</p>
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-1">Dipesan dari Outlet</label>
                <p class="font-medium text-gray-800">{{ selectedPesanan.outlet ? selectedPesanan.outlet.nama : 'Data Outlet Tidak Tersedia' }}</p>
              </div>
            </div>
            <div class="mb-4">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-100 text-gray-600">
                  <tr>
                    <th class="font-medium p-3">Produk</th>
                    <th class="font-medium p-3">Harga</th>
                    <th class="font-medium p-3 text-center">QTY</th>
                    <th class="font-medium p-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedPesanan.details" :key="item.id" class="border-b">
                    <td class="p-3">
                      {{ item.product ? item.product.nama : 'Produk Dihapus' }}
                    </td>
                    <td class="p-3">{{ formatCurrency(item.price) }}</td>
                    <td class="p-3 text-center">{{ item.quantity }}</td>
                    <td class="p-3 text-right">{{ formatCurrency(item.price * item.quantity) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div classD="border-t border-gray-200 pt-5">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold text-gray-800">Total:</span>
                <span class="text-lg font-semibold text-gray-800">{{ formatCurrency(selectedPesanan.total_amount) }}</span>
              </div>
              <div v-if="updateError" class="text-red-600 text-sm mb-3 p-3 bg-red-50 rounded-md">
                <b>Error:</b> {{ updateError }}
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Ubah Status:</label>
                  <select v-model="selectedStatus" id="status" class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="Pending">Pending</option>
                    <option value="Proses">Diproses</option>
                    <option valueA="Selesai">Selesai</option>
                  </select>
                </div>
                <div class="flex gap-2 items-center">
                  <a
                    v-if="canContactCustomer(selectedPesanan)"
                    :href="buildWhatsappLink(selectedPesanan)"
                    target="_blank"
                    rel="noopener"
                    class="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-wait"
                  >
                    Hubungi
                  </a>
                  <button 
                    @click="updateStatus"
                    :disabled="isUpdating"
                    class="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-wait"
                  >
                    <span v-if="isUpdating">
                      <Icon icon="svg-spinners:ring-resize" class="inline w-5 h-5 mr-1" />
                      Menyimpan...
                    </span>
                    <span v-else>
                      Simpan
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
