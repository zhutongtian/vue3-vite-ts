import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { LOGIN_URL } from "@/config/config";
import { getFlatArr } from "@/utils/util";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import NProgress from "@/config/nprogress";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"), // 建议进行路由懒加载，优化访问性能
  },
  // {
  //   path: "/home/index",
  //   name: "home",
  //   component: () => import("@/views/home/index.vue"), // 建议进行路由懒加载，优化访问性能
  //   meta: {
  //     icon: "HomeFilled",
  //     title: "首页",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: true,
  //     isKeepAlive: true,
  //   },
  // },
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
  {
    path: "/counter",
    name: "counter",
    component: () => import("@/views/Counter.vue"),
  },
  {
    path: "/clock",
    name: "clock",
    component: () => import("@/views/Clock.vue"),
  },
  {
    path: "/sign",
    name: "sign",
    component: () => import("@/views/Sign.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // routes,
  routes: [...routes, ...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  // 1.NProgress 开始
  NProgress.start();

  // 2.如果是访问登陆页，直接放行
  if (to.path === LOGIN_URL) return next();

  // 3.判断是否有 Token，没有重定向到 login
  const globalStore = GlobalStore();
  if (!globalStore.token) return next({ path: LOGIN_URL, replace: true });

  // 4.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  const authStore = AuthStore();
  authStore.setRouteName(to.name as string);
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // 5.正常访问页面
  next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = AuthStore();
  let dynamicRouter = getFlatArr(
    JSON.parse(JSON.stringify(authStore.authMenuListGet))
  );
  dynamicRouter.forEach((route) => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

export default router;
