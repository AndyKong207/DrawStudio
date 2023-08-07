import http from "~/api";

export const queryDrawList = (params: { lastpid: string }) => {
  return http.post("/api/draw/list", params);
};
