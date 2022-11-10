import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"), // 建议进行路由懒加载，优化访问性能
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/views/Demo.vue"),
  },
  {
    path: "/step",
    name: "step",
    component: () => import("@/views/Step.vue"),
  },
  {
    path: "/animation",
    name: "animation",
    component: () => import("@/views/Animation.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/loading",
    name: "loading",
    component: () => import("@/views/Loading.vue"),
  },
  {
    path: "/scroll",
    name: "scroll",
    component: () => import("@/views/Scroll.vue"),
  },
  {
    path: "/splitPanel",
    name: "splitPanel",
    component: () => import("@/views/SplitPanel.vue"),
  },
  {
    path: "/formWave",
    name: "formWave",
    component: () => import("@/views/FormWave.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
