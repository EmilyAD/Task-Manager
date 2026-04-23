import axiosInstance from "./axiosInstance";

export const getAllTasks = () => axiosInstance.get("/tasks").then(r => r.data);
export const getTaskById = (id) => axiosInstance.get(`/tasks/${id}`).then(r => r.data);
export const createTask = (data) => axiosInstance.post("/tasks", data).then(r => r.data);
export const updateTask = (id, data) => axiosInstance.put(`/tasks/${id}`, data).then(r => r.data);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`).then(r => r.data);