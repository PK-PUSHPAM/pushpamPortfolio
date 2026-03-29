import { apiRequest } from "./api";

export const getAllSocialLinks = async () => {
  return apiRequest({
    endpoint: "/social-links",
    method: "GET",
  });
};

export const createSocialLink = async (payload) => {
  return apiRequest({
    endpoint: "/social-links",
    method: "POST",
    body: payload,
    isAuthRequired: true,
  });
};

export const updateSocialLink = async (id, payload) => {
  return apiRequest({
    endpoint: `/social-links/${id}`,
    method: "PUT",
    body: payload,
    isAuthRequired: true,
  });
};

export const deleteSocialLink = async (id) => {
  return apiRequest({
    endpoint: `/social-links/${id}`,
    method: "DELETE",
    isAuthRequired: true,
  });
};
