import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userAPI = {
  register: (formData) => {
    return api.post("/api/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAllUsers: () => {
    return api.get("/api/users");
  },

  getUserById: (id) => {
    return api.get(`/api/users/${id}`);
  },

  updateUser: (id, formData) => {
    return api.put(`/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteUser: (id) => {
    return api.delete(`/api/users/${id}`);
  },
};

export default api;
