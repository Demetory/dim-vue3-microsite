// Core
import { createApp } from "vue";
import App from "@/App.vue";

// Pinia
import { createPinia } from "pinia";
import router from "@/router";

// Global CSS
import "@/assets/scss/index.scss";

// Create App
const app = createApp(App);

// Use Modules
app.use(createPinia());
app.use(router);

// Mount
app.mount("#app");
