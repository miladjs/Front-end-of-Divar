import api from "../config/api.config";

export const getProfile = async () => {
  const res = await api.get("user/whoami");
  if (res) return res;
  return false;
};
