import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Search } from "lucide-react";

export default function AllTasks() {
  const { tasks, completeTask, searchQuery, setSearchQuery } = useApp();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(tasks.map((t) => t.category));
    return ["all", ...Array.from(cats)];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (filter === "active") {
      filtered = filtered.filter((t) => !t.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "growth") {
        return b.growthStage - a.growthStage;
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

    return filtered;
  }, [tasks, filter, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all your tasks
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
          />
        </div>
      </div>

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => completeTask(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">No tasks found</p>
        </div>
      )}
    </div>
  );
}