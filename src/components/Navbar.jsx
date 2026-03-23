import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-green-600">
        Task Manager
      </h1>

      <div className="flex gap-6 text-gray-700 font-medium">

        <Link to="/" className="hover:text-green-600">
          Home
        </Link>

        <Link to="/tasks" className="hover:text-green-600">
          All Tasks
        </Link>

        <Link to="/category" className="hover:text-green-600">
          Categories
        </Link>

        <Link to="/my-tasks" className="hover:text-green-600">
          My Tasks
        </Link>
        <Link to="/TaskProgress" className="hover:text-green-600">
          TaskProgress
        </Link>
        <Link to="/profile" className="hover:text-green-600">
          Profile
        </Link>

        <Link to="/login" className="hover:text-green-600">
          Login
        </Link>

      </div>

    </nav>
  );
}