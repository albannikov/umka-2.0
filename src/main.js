import { createApp, h } from 'vue'
import App from './App.vue'



// createApp(App).mount('#app')

import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
// import App from "./App.vue";
const app = createApp(App);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount("#app");



