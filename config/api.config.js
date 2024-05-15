import axios from "axios";
import { getCookie, saveCookie } from "./cookie.config";
import { getAccessToken } from "../service/authService";

const api = axios.create({
  baseURL: "https://api.wijo.ir",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const res = await getAccessToken();
      if (!res?.response) return;
      saveCookie(res.response.data);
      return api(orginalRequest);
    }
  }
);

export default api;

const apifile = axios.create({
  baseURL: "https://api.wijo.ir",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apifile.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apifile.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const res = await getAccessToken();
      if (!res?.response) return;
      saveCookie(res.response.data);
      return apifile(orginalRequest);
    }
  }
);

export { apifile };
