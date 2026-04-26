import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../api/authService";
import { getAllTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "../api/taskService";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser
      ? JSON.parse(savedUser)
      : { name: "New User", email: "user@example.com", profilePicture: null, joinDate: new Date().toISOString(), bio: "" };
  });

  // Fetch tasks from backend when logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    getAllTasks()
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to fetch tasks:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const newUser = {
      name: data.name || "User",   
      email: data.email || email,       
      profilePicture: null,
      joinDate: new Date().toISOString(),
      bio: "Growing my digital garden! 🌿"
    };
    setUser(newUser);
    localStorage.setItem("app_user", JSON.stringify(newUser));
    setIsLoggedIn(true);
  };

  const register = async (email, password, name) => {
  await registerUser(email, password, name);
};

  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setTasks([]);
    setUser({ name: "New User", email: "user@example.com", profilePicture: null, joinDate: new Date().toISOString(), bio: "" });
    localStorage.removeItem("app_user");
  };

  const updateProfile = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("app_user", JSON.stringify(updated));
      return updated;
    });
  };

  const addTask = async (newTask) => {
    const created = await apiCreateTask(newTask);
    setTasks(prev => [...prev, created]);
  };

  const updateTask = async (id, newData) => {
    const updated = await apiUpdateTask(id, newData);
    setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? updated : t));
  };

  const deleteTask = async (id) => {
    await apiDeleteTask(id);
    setTasks(prev => prev.filter(t => t._id !== id && t.id !== id));
  };

  const updateTaskProgress = async (id, growthStage) => {
  setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? { ...t, growthStage } : t));
  try {
    await apiUpdateTask(id, { growthStage });
  } catch (err) {
    console.error("Failed to update progress:", err);
  }
};
const completeTask = async (id) => {
  const task = tasks.find(t => t._id === id || t.id === id);
  const updated = { ...task, completed: !task.completed };
  setTasks(prev => prev.map(t => (t._id === id || t.id === id) ? updated : t));
  try {
    await apiUpdateTask(id, { completed: !task.completed });
  } catch (err) {
    console.error("Failed to complete task:", err);
  }
};

  const toggleSubtask = async (taskId, subtaskId) => {
  const task = tasks.find(t => t._id === taskId || t.id === taskId);
  const updatedSubtasks = task.subtasks.map(st =>
    st.id === subtaskId ? { ...st, done: !st.done } : st
  );
  const updated = await apiUpdateTask(taskId, { 
    subtasks: updatedSubtasks, 
    completed: updatedSubtasks.every(st => st.done) 
  });
  setTasks(prev => prev.map(t => (t._id === taskId || t.id === taskId) ? updated : t));
};

  return (
    <AppContext.Provider value={{
      tasks, loading,
      addTask, updateTask, deleteTask,
      updateTaskProgress, completeTask, toggleSubtask,
      theme, toggleTheme,
      user, login, register, logout, updateProfile,
      isLoggedIn,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}