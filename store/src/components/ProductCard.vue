<template>
  <router-link :to="{
    name: 'ProductDetailsPage',
    params: {
      name: product.name 
    }
  }" class="shadow-md rounded-sm p-4 space-y-2 flex items-start justify-center flex-col">
      <img :src="product.preview_image" alt="Product Preview Image"></img>
      <p class="text-base text-gray-800 font-medium mt-2">{{ product.name }}</p>
      <p class="text-xl font-bold text-gray-900">{{ formatCurrency(product.price, product.currency) }}</p>
    </router-link>  
</template>

<script setup>
import { formatCurrency } from '@/utils';

const props = defineProps({
  product: Object
})
</script>
