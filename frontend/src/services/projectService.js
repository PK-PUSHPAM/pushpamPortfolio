import { apiRequest } from "./api";

export const getAllProjects = async () => {
  return apiRequest({
    endpoint: "/projects",
    method: "GET",
  });
};

export const getProjectBySlug = async (slug) => {
  return apiRequest({
    endpoint: `/projects/${slug}`,
    method: "GET",
  });
};

export const createProject = async (payload) => {
  return apiRequest({
    endpoint: "/projects",
    method: "POST",
    body: payload,
    isAuthRequired: true,
  });
};

export const updateProject = async (id, payload) => {
  return apiRequest({
    endpoint: `/projects/${id}`,
    method: "PUT",
    body: payload,
    isAuthRequired: true,
  });
};

export const deleteProject = async (id) => {
  return apiRequest({
    endpoint: `/projects/${id}`,
    method: "DELETE",
    isAuthRequired: true,
  });
};
