import http from "~/api";

import { Login } from "../interface";

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/api/user/login", params); // 正常 post json 请求  ==>  application/json
};
export const getUserInfo = () => {
  return http.post("/api/user/info");
};
export const sendSms = (params: Login.ReqLoginForm) => {
  return http.post("/api/user/send-sms", params);
};
export const loginSms = (params: Login.ReqLoginForm) => {
  return http.post("/api/user/login-sms", params);
};
export const signup = (params: Login.ReqLoginForm) => {
  return http.post("/api/user/signup", params);
};

export const logout = () => {
  return http.post("/api/user/logout");
};
export const check = () => {
  return http.post("/api/user/check");
};

// captcha 是腾讯人机验证码前端校验方法，调用前先引入 <script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>
// 这个方法返回的 ticket, randstr 参数，一些敏感接口（登录注册等）需要一并传入
// 具体可以看接口文档 https://gist.github.com/iwestlin/af842ea44ac7fd6401ad7c8c6cb63c8a
export function captcha() {
  const { TencentCaptcha } = window as any;
  return new Promise((resolve, reject) => {
    try {
      const captcha = new TencentCaptcha(
        "192124353",
        (res: any) => {
          if (res.ret === 0) {
            const { ticket, randstr } = res;
            resolve({ ticket, randstr });
          } else {
            console.log("验证失败:", res);
            // Message.warning({ content: "用户行为验证未通过" });
            reject(new Error("用户行为验证未通过"));
          }
        },
        {}
      );
      captcha.show();
    } catch (err) {
      // Message.warning({ content: "验证码加载失败，请联系网站管理员" });
      reject(err);
    }
  });
}
