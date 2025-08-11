<template>
  <NavBar />
  <div class="m-3">
    <router-view />
  </div>
</template>

<script setup>
import { watch, inject } from "vue";
import NavBar from "@/components/NavBar.vue";

const cart = inject("cart")

watch(cart.items, () => {
  localStorage.setItem("cart", JSON.stringify(cart))
})
</script>
