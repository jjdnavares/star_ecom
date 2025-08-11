import { createApp, reactive } from "vue"

import App from "./App.vue"
import router from "./router"
import { initSocket } from "./socket"

import {
	Alert,
	Badge,
	Button,
	Dialog,
	ErrorMessage,
	FormControl,
	Input,
	TextInput,
	frappeRequest,
	pageMetaPlugin,
	resourcesPlugin,
	setConfig,
} from "frappe-ui"

import "./index.css"
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const globalComponents = {
	Button,
	TextInput,
	Input,
	FormControl,
	ErrorMessage,
	Dialog,
	Alert,
	Badge,
}

const app = createApp(App)

let cartData = localStorage.getItem("cart")
if (!cartData) {
	const cartJSON = JSON.stringify({
		items: [],
	})
	localStorage.setItem("cart", cartJSON)
	cartData = {
		items: [],
	}
} else {
	cartData = JSON.parse(cartData)
}

const cart = reactive(cartData)

app.provide("cart", cart)

setConfig("resourceFetcher", frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(pageMetaPlugin)

const socket = initSocket()
app.config.globalProperties.$socket = socket

for (const key in globalComponents) {
	app.component(key, globalComponents[key])
}

const options = {}
app.use(Toast)

app.mount("#app")
