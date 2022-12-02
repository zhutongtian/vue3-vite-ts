import { post, get } from "@/api/index";
import DynamicRouter from "@/assets/json/dynamicRouter.json";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: object) => post("/geeker/login", params, {});
// * 获取菜单列表
// export const getAuthMenuListApi = () => get("/geeker/menu/list", {});
export const getAuthMenuListApi = () => {
  return DynamicRouter;
};
// * 获取按钮权限
export const getAuthButtonListApi = () => get("/geeker/auth/buttons", {});
