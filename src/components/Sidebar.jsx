import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6">

      <h2 className="text-2xl font-bold mb-10">
        Task Manager
      </h2>

      <nav className="flex flex-col gap-4">

        <Link to="/" className="hover:text-green-400">
          Dashboard
        </Link>

        <Link to="/tasks" className="hover:text-green-400">
          All Tasks
        </Link>

        <Link to="/category" className="hover:text-green-400">
          Categories
        </Link>

        <Link to="/add-task" className="hover:text-green-400">
          Add Task
        </Link>

        <Link to="/my-tasks" className="hover:text-green-400">
          My Tasks
        </Link>

        <Link to="/profile" className="hover:text-green-400">
          Profile
        </Link>

      </nav>

      <div className="mt-auto pt-10">
        <Link
          to="/login"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Logout
        </Link>
      </div>

    </div>
  );
}