import request from "@/utils/request";

/**
 * post请求;
 */
export const post = (url: string, data: object, params: object) => {
  return request({
    method: "post",
    url,
    params,
    data,
  });
};

/**
 * get 请求;
 */
export const get = (url: string, params: object) => {
  return request({
    method: "get",
    url,
    params,
  });
};

/**
 * 导出;
 */
export const downFile = (url: string, data: object, params: object) => {
  return request({
    method: "post",
    url,
    params,
    data,
    responseType: "blob",
  });
};

/**
 * 导入;
 */
export const uploadFile = (url: string, data: object) => {
  return request({
    method: "post",
    url,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
