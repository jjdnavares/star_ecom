import { userResource } from "@/data/user"
import { createRouter, createWebHistory } from "vue-router"
import { session } from "./data/session"

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/Home.vue"),
		meta: {
			requiresAuth: false,
		},
	},
	// {
	// 	name: "Login",
	// 	path: "/account/login",
	// 	component: () => import("@/pages/Login.vue"),
	// },
	{
		path: "/checkout",
		name: "CheckoutPage",
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
