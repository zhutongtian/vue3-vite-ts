import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App.vue";
import router from "./router/index";
// import mixin from "./utils/mixin";
import store from "./store";

import CTable from "@/components/table.vue";

const app = createApp(App);
app.use(router);
// app.config.globalProperties.$axios = axios
app.use(store);
// app.mixin(mixin);
app.use(ElementPlus);
app.mount("#app");
