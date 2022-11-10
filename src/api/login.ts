import request from "../utils/request";

// 用户名密码登录
export function loginByJson(data: object) {
  return request({
    url: "/api/u/loginByJson",
    method: "post",
    data,
  });
}

// 发送注册或登录验证码
export function sendCaptcha(params: any) {
  return request({
    url: "/api/sms/sendRegisterOrLoginCaptcha",
    params,
  });
}

// 获取树组织数据
export function loginByMobile(data: object) {
  return request({
    url: "/api/u/loginByMobile",
    method: "post",
    data,
  });
}

// 新增
export function add(data: object) {
  return request({
    url: "/table/add",
    method: "post",
    baseURL: "/mock",
    data,
  });
}

// 编辑
export function update(data: object) {
  return request({
    url: "/table/update",
    method: "post",
    baseURL: "/mock",
    data,
  });
}

// 删除
export function del(data: object) {
  return request({
    url: "/table/del",
    method: "post",
    baseURL: "/mock",
    data,
  });
}
