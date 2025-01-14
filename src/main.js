import { createApp } from "vue";
import App from "./client/App.vue";
import router from "./client/router";
import "./assets/tailwind.css";
import { Heart } from "lucide-vue-next";

const app = createApp(App);
app.use(router);
app.mount("#app");
