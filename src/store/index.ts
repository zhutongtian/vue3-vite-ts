// import { defineStore } from "pinia";

// const defaultState = {
//   count: 0,
// };
// export const useStore = defineStore("main", {
//   // state 推荐箭头函数，为了TS类型推断
//   state: () => {
//     return {
//       name: "张三",
//       counter: 0,
//     };
//   },
//   getters: {},
//   actions: {},
// });
import { defineStore, createPinia } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { DEFAULT_PRIMARY } from "@/config/config";
import { GlobalState, ThemeConfigProps } from "./interface";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "GlobalState",
  state: (): GlobalState => ({
    // token
    token: "",
    // userInfo
    userInfo: "",
    // element组件大小
    assemblySize: "default",
    // language
    language: "",
    // themeConfig
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true,
      // 当前页面是否全屏
      maximize: false,
    },
  }),
  getters: {},
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token;
    },
    // setUserInfo
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize;
    },
    // updateLanguage
    updateLanguage(language: string) {
      this.language = language;
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig;
    },
  },
  persist: piniaPersistConfig("GlobalState"),
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
