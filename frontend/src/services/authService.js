import { apiRequest } from "./api";

export const loginAdmin = async (payload) => {
  return apiRequest({
    endpoint: "/auth/login",
    method: "POST",
    body: payload,
  });
};
