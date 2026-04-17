import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, X, TrendingUp, ListTodo, Folder, Plus, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar({ onClose }) {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-green-600 text-white"
        : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
    }`;

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 z-[9999] flex flex-col p-6 border-r border-gray-200 dark:border-slate-800 shadow-lg">
      <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition">
        <X size={18} />
      </button>
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-2 text-gray-900 dark:text-white">
        🌸 Bloomly
      </h2>
      <nav className="flex flex-col gap-2">
        <Link to="/tasks" className={linkClass("/tasks")}><ListTodo size={18} />All Tasks</Link>
        <Link to="/category" className={linkClass("/category")}><Folder size={18} />Categories</Link>
        <Link to="/add-task" className={linkClass("/add-task")}><Plus size={18} />Add Task</Link>
        <Link to="/TaskProgress" className={linkClass("/TaskProgress")}><TrendingUp size={18} />Progress</Link>
        <Link to="/profile" className={linkClass("/profile")}><User size={18} />Profile</Link>
      </nav>
      <div className="mt-auto space-y-4 pt-6">
        <button onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:scale-110 transition-all shadow-sm">
          {theme === "dark" ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
        <Link to="/login" className="block text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Logout
        </Link>
      </div>
    </div>
  );
}