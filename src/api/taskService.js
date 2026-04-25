import axiosInstance from "./axiosInstance";

export const getAllTasks = () => axiosInstance.get("api/tasks").then(r => r.data);
export const getTaskById = (id) => axiosInstance.get(`api/tasks/${id}`).then(r => r.data);
export const createTask = (data) => axiosInstance.post("api/tasks", data).then(r => r.data);
export const updateTask = (id, data) => axiosInstance.put(`api/tasks/${id}`, data).then(r => r.data);
export const deleteTask = (id) => axiosInstance.delete(`api/tasks/${id}`).then(r => r.data);