<template>
  <h2 class="my-4 font-semibold text-lg">Our Products</h2>

  <div class="m-4 grid grid-cols-1 sm:grid-cols-4 gap-3" v-if="productsList">
    <ProductCard v-for="product in productsList" :key="product.name" :product="product"/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { createListResource } from 'frappe-ui';
import ProductCard from '@/components/ProductCard.vue';

const products = createListResource({
    doctype: 'Product',
    fields: ['name', 'preview_image', 'price', 'currency'],
    auto: true, 
})  

const productsList = computed(() => {
  if (products.list.data) {
    return products.list.data
  }
  return []
})
</script>