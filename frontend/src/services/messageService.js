import { apiRequest } from "./api";

export const createMessage = async (payload) => {
  return apiRequest({
    endpoint: "/messages",
    method: "POST",
    body: payload,
  });
};

export const getAllMessages = async () => {
  return apiRequest({
    endpoint: "/messages",
    method: "GET",
    isAuthRequired: true,
  });
};

export const markMessageAsRead = async (id) => {
  return apiRequest({
    endpoint: `/messages/${id}/read`,
    method: "PATCH",
    isAuthRequired: true,
  });
};

export const deleteMessage = async (id) => {
  return apiRequest({
    endpoint: `/messages/${id}`,
    method: "DELETE",
    isAuthRequired: true,
  });
};
