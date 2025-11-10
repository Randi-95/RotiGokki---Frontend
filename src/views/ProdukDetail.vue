<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()
    const product = ref({})
    const id = route.params.id
    const backendUrl = 'http://127.0.0.1:8000'
    
    const keranjang = ref([])

    
    onMounted(async () => {
        const response = await axios.get(`${backendUrl}/api/products/${id}`)
        product.value = response.data

        console.log(response.data)

        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            keranjang.value = JSON.parse(savedCart);
        }
    })


    const formatRupiah = (value) => {
        if(!value) return 0
        return value.toLocaleString('id-ID')
    }

    const goBack = () => {
         if (window.history.length > 1) {
            router.go(-1)
         } else {
            router.push('/') 
         }
    }

    const addToCart = () => {
        const selectedOutletString = localStorage.getItem('selectedOutlet');
        
        if (!selectedOutletString) {
            Swal.fire({
                title: "Outlet Belum Dipilih",
                text: "Anda harus memilih outlet terlebih dahulu sebelum menambah pesanan.",
                icon: 'warning',
                confirmButtonText: 'Pilih Outlet Sekarang'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/outlet'); 
                }
            });
            return; 
        }

        if (!product.value || !product.value.id) {
            Swal.fire({
                title: "Error",
                text: "Data produk belum dimuat, silakan coba lagi.",
                icon: 'error'
            });
            return;
        }
        const existingItem = keranjang.value.find(item => item.id === product.value.id);

        if (existingItem) {
            existingItem.quantity += jumlahPesanan.value;
        } else {
            keranjang.value.push({
                ...product.value,
                quantity: jumlahPesanan.value
            });
        }

        Swal.fire({
            title: "Berhasil",
            text: "Pesanan Berhasil Ditambahkan",
            icon: 'success'
        })
        
        router.push('/keranjang');
    };

    watch(keranjang, (nilaiKeranjangBaru) => {
        localStorage.setItem('shoppingCart', JSON.stringify(nilaiKeranjangBaru));
    }, { deep: true });

    const jumlahPesanan = ref(1)

    const tambahPesan = () => {
        jumlahPesanan.value++
    }

    const kurangPesan = () => {
        if(jumlahPesanan.value > 1){
            jumlahPesanan.value--
        }
    }

    const totalPesanan = computed(() => {
        if(product.value && product.value.price){
            return product.value.price * jumlahPesanan.value
        }

        return 0
    })
</script>


<template>
    <div class="flex flex-col items-center justify-center  h-screen px-5 md:px-10 font-sans">
        <button @click="goBack" class=" w-full cursor-pointer">
            <Icon icon="formkit:arrowleft" class="text-[#333333] text-2xl"/>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div class="w-full">
            <div class="rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                <img :src="`${backendUrl}${product.image_url}`"
                    alt="Product Image"
                    class="w-100 h-auto object-cover rounded-md">
            </div>
            </div>

            <div class="space-y-6">
            <p class="text-sm tracking-wide text-gray-400 uppercase">{{ product?.kategori?.name }}</p>
            <h1 class="text-3xl md:text-4xl font-bold text-primary">{{ product?.nama }}</h1>

            <p class="text-2xl font-bold text-[#333333]">Rp {{ formatRupiah(product?.price) }}</p>

            <p class="text-gray-600 leading-relaxed">
                {{ product?.deskripsi }}
            </p>

            <div class="flex items-center gap-3">
                <button id="btn-kurang" class="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100" @click="kurangPesan">−</button>
                <p>{{ jumlahPesanan }}</p>
                <button id="btn-tambah" class="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-100" @click="tambahPesan">+</button>
            </div>

            <div class="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                <span class="font-medium text-gray-700">Total</span>
                <span class="text-xl font-bold text-primary">Rp {{ formatRupiah(totalPesanan) }}</span>
            </div>


            <button @click="addToCart" class="w-full bg-primary text-white py-4 rounded-full text-lg font-medium hover:bg-blue-400 transition">
                Tambah ke Keranjang
            </button>
            </div>

        </div>
    </div>

</template>