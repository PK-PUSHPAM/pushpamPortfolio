const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem("portfolio_admin_token");
};

const clearAuthSession = () => {
  localStorage.removeItem("portfolio_admin_token");
};

const redirectToAdminLogin = () => {
  if (window.location.pathname !== "/admin/login") {
    window.location.href = "/admin/login";
  }
};

const buildHeaders = (isAuthRequired = false) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isAuthRequired) {
    const token = getAuthToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async (response, isAuthRequired = false) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && isAuthRequired) {
      clearAuthSession();
      redirectToAdminLogin();
    }

    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const apiRequest = async ({
  endpoint,
  method = "GET",
  body = null,
  isAuthRequired = false,
}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: buildHeaders(isAuthRequired),
    body: body ? JSON.stringify(body) : null,
  });

  return handleResponse(response, isAuthRequired);
};
