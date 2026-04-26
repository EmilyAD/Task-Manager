// src/api/taskService.js
import axiosInstance from "./axiosInstance";

export const getAllTasks = async () => {
  const res = await axiosInstance.get("/api/tasks");
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axiosInstance.get(`/api/tasks/${id}`);
  return res.data;
};

export const createTask = async (taskData) => {
  // taskData = { title, description, status, dueDate }
  const res = await axiosInstance.post("/api/tasks", taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await axiosInstance.put(`/api/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`/api/tasks/${id}`);
  return res.data;
};