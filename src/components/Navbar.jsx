import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, TrendingUp, ListTodo, Folder, Plus, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
      location.pathname === path
        ? "bg-green-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-green-600"
    }`;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-sm">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        🌸 Bloomly
      </h1>

      {/* Links */}
      <div className="flex items-center gap-1">
        <Link to="/tasks" className={linkClass("/tasks")}><ListTodo size={16} />All Tasks</Link>
        <Link to="/category" className={linkClass("/category")}><Folder size={16} />Categories</Link>
        <Link to="/add-task" className={linkClass("/add-task")}><Plus size={16} />Add Task</Link>
        <Link to="/TaskProgress" className={linkClass("/TaskProgress")}><TrendingUp size={16} />Progress</Link>
        <Link to="/profile" className={linkClass("/profile")}><User size={16} />Profile</Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:scale-110 transition-all">
          {theme === "dark" ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-600" />}
        </button>
        <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
          Logout
        </Link>
      </div>
    </nav>
  );
}