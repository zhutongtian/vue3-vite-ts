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
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
store.use(piniaPluginPersist);

export default store;
