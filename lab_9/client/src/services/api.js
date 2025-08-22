import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userAPI = {
  // Register a new user
  register: (formData) => {
    return api.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get all users
  getAllUsers: () => {
    return api.get("/users");
  },

  // Get user by ID
  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },

  // Update user
  updateUser: (id, formData) => {
    return api.put(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete user
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
};

export default api;
