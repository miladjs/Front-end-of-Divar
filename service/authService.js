import { getCookie } from "../config/cookie.config";
import api from "./../config/api.config";

export const sendOTP = async (mobile) => {
  try {
    const response = await api.post("/auth/send-otp", {
      mobile,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const checkOTP = async (mobile, code) => {
  try {
    const response = await api.post("/auth/check-otp", {
      mobile,
      code,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getAccessToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await api.post("/auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
