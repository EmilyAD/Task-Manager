import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 w-full">

        {/* Top bar */}
        <Menu
          onClick={() => setOpen(!open)}
          className="cursor-pointer mb-4"
        />

        <Outlet />
      </div>

    </div>
  );
}