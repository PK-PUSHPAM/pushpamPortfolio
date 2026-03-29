import { apiRequest } from "./api";

export const getProfile = async () => {
  return apiRequest({
    endpoint: "/profile",
    method: "GET",
  });
};

export const upsertProfile = async (payload) => {
  return apiRequest({
    endpoint: "/profile",
    method: "PUT",
    body: payload,
    isAuthRequired: true,
  });
};
