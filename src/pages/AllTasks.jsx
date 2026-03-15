import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Search } from "lucide-react";

export default function AllTasks() {

  const { tasks, completeTask } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(tasks.map(t => t.category));
    return ["all", ...Array.from(cats)];
  }, [tasks]);

  const filteredTasks = useMemo(() => {

    let filtered = tasks;

    if (filter === "active") {
      filtered = filtered.filter(t => !t.completed);
    }

    if (filter === "completed") {
      filtered = filtered.filter(t => t.completed);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "growth") {
        return b.growthStage - a.growthStage;
      }

      return new Date(b.dueDate) - new Date(a.dueDate);

    });

    return filtered;

  }, [tasks, filter, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Tasks
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track all your growing tasks
        </p>
      </div>


      {/* SEARCH + FILTER CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">

        <div className="flex flex-col sm:flex-row gap-4">

          {/* SEARCH */}
          <div className="flex-1 relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>

          {/* STATUS FILTER */}
          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <option value="date">Due Date</option>
            <option value="name">Name</option>
            <option value="growth">Growth</option>
          </select>

        </div>


        {/* CATEGORY FILTERS */}
        <div className="flex gap-2 flex-wrap">

          {categories.map(cat => (

            <button
              key={cat}
              onClick={()=>setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${selectedCategory===cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}
              `}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>

          ))}

        </div>

      </div>


      {/* RESULT COUNT */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredTasks.length} tasks
      </p>


      {/* TASK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredTasks.map(task => (

          <TaskCard
            key={task.id}
            task={task}
            onComplete={()=>completeTask(task.id)}
          />

        ))}

      </div>

    </div>
  );
}