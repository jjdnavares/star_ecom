import { userResource } from "@/data/user"
import { createRouter, createWebHistory } from "vue-router"
import { session } from "./data/session"

const routes = [
	{
		path: "/",
		name: "Home",
		redirect: { name: "ProductsPage" }
	},
	{
		name: "ProductsPage",
		path: "/products",
		component: () => import("@/pages/Products.vue"),
	},
	{
		name: "ProductDetailsPage",
		path: "/product/:name",
		component: () => import("@/pages/ProductDetails.vue"),
	},
	{
		path: "/checkout",
		name: "CheckoutPage",
		component: () => import("@/pages/Checkout.vue"),
		meta: {
			requiresAuth: true,
		},
	}
]

const router = createRouter({
	history: createWebHistory("/store"),
	routes,
})

router.beforeEach(async (to, from, next) => {
	let isLoggedIn = session.isLoggedIn
	try {
		await userResource.promise
	} catch (error) {
		isLoggedIn = false
	}

	// if (to.name === "Login" && isLoggedIn) {
	// 	next({ name: "Home" })
	// } else if (to.name !== "Login" && !isLoggedIn) {
	// 	next({ name: "Login" })
	// } else {
	// 	next()
	// }

	if (to.meta.requiresAuth && !isLoggedIn) {
		// throw them to login page
		window.location.href = "/login?redirect-to=/store"
	}
	next()

})

export default router
