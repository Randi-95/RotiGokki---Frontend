<script setup>
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
const isSidebarOpen = ref(false);

const totalProduk = ref()
const totalOutlet = ref()
const totalKategori = ref()
const totalProdukPerKategori = ref([])
const pesanans = ref([])
const router = useRouter()



const adminUser = computed(() => {
  const adminData = localStorage.getItem('data_admin_saya');
  if (adminData) {
    return JSON.parse(adminData);
  }
  return { role: null, outlet_id: null };
});

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

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const fetchTotalProduk = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/totalProduk')

  console.log(response.data)

  totalProduk.value = response.data
}

const fetchTotalOutlet = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/totalOutlet')

  console.log(response.data)

  totalOutlet.value = response.data
}

const fetchTotalKategori = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/totalKategori')

  console.log(response.data)

  totalKategori.value = response.data
}

const fetchTotalProdukPerKategori = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/totalProdukperKategori')

  console.log(response.data.data)

  totalProdukPerKategori.value = response.data.data
}

const fetchPesanan = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/orders?page=1')

  console.log(response.data.data)
  pesanans.value = response.data.data
}

onMounted(() => {
  if (adminUser.value.role === 'admin_outlet') {
    router.replace('/dashboard-stok'); 
    
    return; 
  }
  fetchPesanan()
  fetchTotalProduk()
  fetchTotalOutlet()
  fetchTotalKategori()  
  fetchTotalProdukPerKategori()
})

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

    <div 
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      aria-hidden="true"
    ></div>

    <div class="lg:ml-72 flex flex-col min-h-screen">
      <header class="sticky top-0 z-10 bg-white shadow-sm flex items-center justify-between p-4 lg:justify-end">
        <button 
          @click="toggleSidebar" 
          class="lg:hidden text-gray-700 hover:text-gray-900"
          aria-label="Buka menu"
        >
          <Icon icon="mdi:menu" class="text-3xl" />
        </button>
        
        <h1 class="lg:hidden font-fredokaone text-[#0F4B7D] font-normal text-2xl absolute left-1/2 -translate-x-1/2">
          Dashboard
        </h1>

        <p class="text-gray-600 text-sm sm:text-base">Selamat datang, {{ adminUser.name }}</p>
      </header>

      <main class="flex-1 p-6 sm:p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 hidden lg:block">Dashboard Overview</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div class="bg-blue-100 p-3 rounded-lg">
              <Icon icon="solar:box-minimalistic-outline" class="text-3xl text-blue-500" />
            </div>
            <div>
              <p class="text-gray-500">Total Produk Aktif</p>
              <p class="text-3xl font-bold text-gray-800">{{ totalProduk?.length }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div class="bg-green-100 p-3 rounded-lg">
              <Icon icon="fluent:building-shop-24-regular" class="text-3xl text-green-500" />
            </div>
            <div>
              <p class="text-gray-500">Total Outlet</p>
              <p class="text-3xl font-bold text-gray-800">{{ totalOutlet?.length }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div class="bg-red-100 p-3 rounded-lg">
              <Icon icon="mdi:tag-outline" class="text-3xl text-red-500" />
            </div>
            <div>
              <p class="text-gray-500">Total Kategori Produk</p>
              <p class="text-3xl font-bold text-gray-800">{{ totalKategori?.length }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Manajemen Cepat</h2>
            <div class="flex flex-col gap-3">
              <RouterLink to="/dashboard-produk" class="w-full bg-[#0F4B7D] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex justify-center">
                Tambah Produk
              </RouterLink>
              <RouterLink to="/dashboard-outlet" class="w-full bg-[#34A853] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex justify-center">
                Tambah Outlet
              </RouterLink>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Pesanan Terbaru</h2>
            <div class="flex flex-col gap-3">
              <div v-for="pesanan in pesanans" :key="pesanan.id" class="flex justify-between items-center text-sm">
                <div class="flex items-center gap-3">
                  <span class="font-semibold py-1 px-3 rounded-full text-[15px]" >{{ pesanan.customer_name }}</span>
                  <p class="text-gray-700 truncate max-w-[120px] sm:max-w-none text-xs">{{ formatDate(pesanan.created_at) }}</p>
                </div>
                <span
                      class="px-3 py-1 text-xs font-semibold rounded-full capitalize"
                      :class="getStatusClass(pesanan.status)"
                    >
                      {{ pesanan.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Ringkasan Kategori Produk</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-100 border border-gray-200 p-6 rounded-xl text-center" v-for="productByCategory in totalProdukPerKategori">
              <p class="text-5xl font-bold text-gray-800">{{ productByCategory.products_count }}</p>
              <p class="text-gray-500 mt-1">{{ productByCategory.name }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

