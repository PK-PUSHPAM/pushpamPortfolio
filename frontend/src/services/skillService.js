import { apiRequest } from "./api";

export const getAllSkills = async () => {
  return apiRequest({
    endpoint: "/skills",
    method: "GET",
  });
};

export const createSkill = async (payload) => {
  return apiRequest({
    endpoint: "/skills",
    method: "POST",
    body: payload,
    isAuthRequired: true,
  });
};

export const updateSkill = async (id, payload) => {
  return apiRequest({
    endpoint: `/skills/${id}`,
    method: "PUT",
    body: payload,
    isAuthRequired: true,
  });
};

export const deleteSkill = async (id) => {
  return apiRequest({
    endpoint: `/skills/${id}`,
    method: "DELETE",
    isAuthRequired: true,
  });
};
