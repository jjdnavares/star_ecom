<template>
    <div class="p-5">
        <div v-if="productDoc">
            <h1 class="font-black text-gray-900 text-xl">
                {{ productDoc.name }}
            </h1>
            
            <div class="sm:flex sm:gap-6">
                <div class="flex gap-3 flex-col w-fit mt-5">
                    <div
                        @click="currentPreviewImage = image.image_url"
                        :class="[
                            'p-2 border-2 border-gray-600/25 rounded hover:opacity-40 transition cursor-pointer',
                            currentPreviewImage === image.image_url
                                ? 'border-gray-600/90'
                                : ''
                        ]"
                        v-for="image in productDoc.images"
                        :key="image"
                    >
                        <img 
                            class="h-16"
                            :src="image.image_url"
                            alt="Product Preview Image"
                        />
                    </div>
                </div>

                <img class="sm:max-w-lg" :src="currentPreviewImage" alt="Product Preview Image" />
            </div>

            <div class="prose prose-sm" v-html="md.render(productDoc.description)"></div>

            <div class="space-y-3">
                <p class="text-3xl font-bold text-gray-900">
                    {{ formatCurrency(productDoc.price, productDoc.currency) }}
                </p>
                
                <Button @click="addToCart" variant="solid" size="2xl">
                    <template #prefix>
                        <FeatherIcon class="w-6 h-6" name="shopping-cart"/>
                    </template>
                    Add to Cart
                </Button>

                <!-- <p>{{ cart.secret }}</p> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { FeatherIcon, Button, createDocumentResource } from 'frappe-ui';
import { formatCurrency } from '@/utils';
import { inject } from 'vue';
import { useToast } from 'vue-toastification';
import markdownIt from 'markdown-it'

const md = markdownIt()

const route = useRoute()
const toast = useToast()
const cart = inject("cart")
const currentPreviewImage = ref(null)

const productResource = createDocumentResource({
    doctype: 'Product',
    name: route.params.name,
    auto: true,   
})

const productDoc = computed(() => {
    if (productResource.doc) {
        return productResource.doc
    }
})

watch(productDoc, () => {
    if (productDoc && productDoc.value.images.length > 0) {
        currentPreviewImage.value = productDoc.value.images[0].image_url
    }
})

function addToCart() {
    const productName = productDoc.value.name
    
    cart.items.push({
        product: productName,
        qty: 1
    })
    toast.success("Product added to cart")
}
</script>
