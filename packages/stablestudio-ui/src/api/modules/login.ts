import http from "~/api";

import { Login } from "../interface";

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/api/user/login", params); // 正常 post json 请求  ==>  application/json
};
