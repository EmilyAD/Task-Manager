import axios from "axios";
import API_BASE_URL from "./config";

export const registerUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}api/auth/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};