import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, Folder, Plus, Flower2, User } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-green-600 text-white"
        : "hover:bg-gray-800 hover:text-green-400"
    }`;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6">

      {/* Logo */}
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
        🌱 Bloomly
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        <Link to="/" className={linkClass("/")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/tasks" className={linkClass("/tasks")}>
          <ListTodo size={18} />
          All Tasks
        </Link>

        <Link to="/category" className={linkClass("/category")}>
          <Folder size={18} />
          Categories
        </Link>

        <Link to="/add-task" className={linkClass("/add-task")}>
          <Plus size={18} />
          Add Task
        </Link>

        <Link to="/my-tasks" className={linkClass("/my-tasks")}>
          <Flower2 size={18} />
          My Garden
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          <User size={18} />
          Profile
        </Link>

      </nav>

      {/* Logout button */}
      <div className="mt-auto pt-10">
        <Link
          to="/login"
          className="block text-center bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Logout
        </Link>
      </div>

    </div>
  );
}