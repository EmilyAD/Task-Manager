import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const categoryColors = {
  Work: {
    bg: "bg-emerald-50 dark:bg-emerald-900",
    border: "border-emerald-200 dark:border-emerald-700",
    accent: "bg-emerald-600",
  },
  Personal: {
    bg: "bg-purple-50 dark:bg-purple-900",
    border: "border-purple-200 dark:border-purple-700",
    accent: "bg-purple-600",
  },
  Learning: {
    bg: "bg-amber-50 dark:bg-amber-900",
    border: "border-amber-200 dark:border-amber-700",
    accent: "bg-amber-600",
  },
  Other: {
    bg: "bg-gray-50 dark:bg-gray-900",
    border: "border-gray-200 dark:border-gray-700",
    accent: "bg-gray-500",
  },
};

const categoryIcons = {
  Work: "💼",
  Personal: "🏠",
  Learning: "📚",
  Other: "📋",
};

export default function TasksByCategory() {
  const { tasks, completeTask, darkMode } = useApp();
  const [expanded, setExpanded] = useState(new Set(["Work", "Personal", "Learning"]));
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const grouped = useMemo(() => {
    const obj = {};
    tasks
      .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
      .forEach(t => {
        if (!obj[t.category]) obj[t.category] = [];
        obj[t.category].push(t);
      });
    return obj;
  }, [tasks, search]);

  const categories = Object.keys(grouped);

  const toggle = (cat) => {
    const newSet = new Set(expanded);
    newSet.has(cat) ? newSet.delete(cat) : newSet.add(cat);
    setExpanded(newSet);
  };

  const handleAddTask = (category) => {
    navigate("/add-task", { state: { category } });
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-6 p-6`}>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks by Category</h1>
          <p className="text-gray-500 dark:text-gray-300">Organize and manage your tasks by category</p>
        </div>
        <Link
          to="/add-task"
          className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          <Plus size={18} />
          Add New Task
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-3xl font-bold text-green-600">{categories.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Categories</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-3xl font-bold text-purple-600">{tasks.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Tasks</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-3xl font-bold text-orange-500">{tasks.filter(t => t.completed).length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Completed Tasks</p>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 w-full max-w-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg"
      />

      {/* CATEGORY CARDS */}
      <div className="space-y-4">
        {categories.map(cat => {
          const color = categoryColors[cat] || categoryColors.Other;
          const icon = categoryIcons[cat] || "📋";
          const catTasks = grouped[cat];
          const completed = catTasks.filter(t => t.completed).length;

          return (
            <div key={cat} className={`rounded-xl border ${color.border} ${color.bg}`}>
              {/* HEADER */}
              <div
                onClick={() => toggle(cat)}
                className="flex justify-between items-center p-5 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${color.accent} dark:bg-gray-700 rounded-lg flex items-center justify-center text-white`}>
                    {icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">{cat}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {catTasks.length} tasks • {completed} completed
                    </p>
                  </div>
                </div>
                {expanded.has(cat) ? <ChevronUp className="text-gray-900 dark:text-white" /> : <ChevronDown className="text-gray-900 dark:text-white" />}
              </div>

              {/* CONTENT */}
              {expanded.has(cat) && (
                <div className="p-5 pt-0 space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTasks.map(task => (
                      <TaskCard key={task._id} task={task} onComplete={() => completeTask(task._id)} />
                    ))}
                  </div>
                  <button
                    onClick={() => handleAddTask(cat)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-lg text-sm"
                  >
                    + Add task to {cat}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}