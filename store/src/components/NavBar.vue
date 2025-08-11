<template>
    <div>
        <nav class="p-4 flex items-center justify-between">
            <router-link :to="{ name: 'ProductsPage' }" class="text-2xl font-bold text-gray-800">
                ✨ Star Store ✨
            </router-link>

            <button @click="cartDialogShown = true" class="flex flex-start">
                <FeatherIcon name="shopping-cart" class="h-6" />
                <Badge variant="solid" color="primary">{{ cart.items.length }}</Badge>
            </button>
        </nav>
    </div>
    <Dialog v-model="cartDialogShown" :options="{
        title: 'Your Cart',
        size: '3xl',
        actions: [
            {
                label: 'Proceed to checkout',
                variant: 'solid',
                color: 'primary',
                onClick: (close) => {
                    close()
                    router.push({ 
                        name: 'CheckoutPage',
                    })
                }
            }
        ]
    }">
        <template #body-content>
            <ul class="space-y-3">
                <li v-for="item, index in cart.items" :key="item.product">
                    #{{ (index + 1) }} - {{ item.product }}
                    <FormControl v-model="item.qty" type="number" placeholder="Quantity" />
                    <Button class="mt-2" variant="outline" theme="red" @click="removeProductFromCart(index)">Remove</Button>
                </li>
            </ul>
        </template>
    </Dialog>
</template>

<script setup>
import { FeatherIcon, Badge, Dialog, FormControl, Button } from "frappe-ui";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const cart = inject("cart")
const cartDialogShown = ref(false)

function removeProductFromCart(index) {
    cart.items.splice(index, 1)
}
</script>