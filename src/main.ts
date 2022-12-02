import { createApp } from "vue";
import App from "./App.vue";
// import "font-awesome/css/font-awesome.min.css";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";

import router from "./router/index";
// import mixin from "./utils/mixin";
import store from "./store";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/store/index";

import CTable from "@/components/table.vue";

const app = createApp(App);

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router);
app.use(I18n);
app.use(pinia);
// app.config.globalProperties.$axios = axios
app.use(store);
// app.mixin(mixin);
app.use(ElementPlus);
app.mount("#app");
