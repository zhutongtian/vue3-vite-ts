import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
// import { useStore } from "../store/index";
import { ElMessage } from "element-plus";
const baseURL: any = import.meta.env.VITE_BASE_URL;
console.log(import.meta.env.VITE_BASE_URL, "111");
const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
// 请求前的统一处理
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // JWT鉴权处理
    // if (useStore.getters['user/token']) {
    //   config.headers['Cas-Auth-Token'] = useStore.state.user.token
    // }
    return config;
  },
  (error: AxiosError) => {
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    } else {
      showError(res);
      return Promise.reject(res);
    }
  },
  (error: AxiosError) => {
    // console.log(error) // for debug
    const badMessage: any = error.message || error;
    const code = parseInt(
      badMessage
        .toString()
        .replace("Error: Request failed with status code ", "")
    );
    showError({ code, message: badMessage });
    return Promise.reject(error);
  }
);

function showError(error: any) {
  if (error.code === 403) {
    // to re-login
    // store.dispatch('user/loginOut')
  } else {
    ElMessage({
      message: error.msg || error.message || "服务异常",
      type: "error",
      // duration: 3 * 1000
    });
  }
}

export default service;
