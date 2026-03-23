import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* ✅ Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 p-6 w-full">

        {/* Top bar */}
        <div className="flex items-center mb-4">
          <Menu
            onClick={() => setOpen(true)}
            className="cursor-pointer text-gray-900 dark:text-white hover:opacity-70 transition"
            size={28}
          />
        </div>

        <Outlet />
      </div>

    </div>
  );
}