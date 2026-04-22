import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Top Navbar - large screens only */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Sidebar - small screens only */}
      <div className={`fixed top-0 left-0 h-screen w-64 z-[9999] transform transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* Hamburger - small screens only */}
      {!open && (
        <div className="fixed top-6 left-6 z-[9997] lg:hidden">
          <button onClick={() => setOpen(true)}
            className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white hover:scale-105 transition-all">
            <Menu size={28} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto ">
        <Outlet />
      </div>

    </div>
  );
}