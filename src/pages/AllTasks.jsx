import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Search } from "lucide-react";
import { Sprout, Trophy } from "lucide-react";

export default function AllTasks() {

  const { tasks, completeTask } = useApp();
const completedTasks = tasks.filter(t => t.completed);

const plantsByCategory = completedTasks.reduce((acc, task) => {
  if (!acc[task.category]) acc[task.category] = [];
  acc[task.category].push(task);
  return acc;
}, {});

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
{/* MY GARDEN */}
<div className="max-w-7xl mx-auto space-y-6 mt-16">

  <div className="flex items-center justify-between">

    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        My Garden
      </h1>

      <p className="text-gray-600 mt-1">
        A beautiful collection of your completed tasks
      </p>
    </div>

    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
      <Trophy className="w-5 h-5 text-green-600"/>
      <span className="font-semibold text-green-900">
        {completedTasks.length} Plants
      </span>
    </div>

  </div>


  {/* Garden field */}
  <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-green-100 rounded-xl p-8 border min-h-[500px]">

    <div className="text-right mb-8 text-6xl">
      ☀️
    </div>

    <div className="flex gap-6 flex-wrap mb-10">

      {completedTasks.map((task,index)=>(
        <div
          key={task.id}
          className="text-5xl animate-bounce"
          style={{animationDelay:`${index*0.2}s`}}
        >
          {task.plantType}
        </div>
      ))}

    </div>

    <div className="h-8 bg-gradient-to-b from-green-600 to-green-800 rounded-lg"></div>

  </div>


  {/* Category cards */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

    {Object.entries(plantsByCategory).map(([category,plants])=>(
      <div key={category} className="bg-white rounded-xl p-6 shadow-sm border">

        <h3 className="font-semibold mb-3">
          {category}
        </h3>

        <div className="flex gap-2 mb-3 text-3xl">
          {plants.map(p=>(
            <span key={p.id}>{p.plantType}</span>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          {plants.length} plant grown
        </p>

      </div>
    ))}

  </div>


  {/* Garden stats */}
  <div className="bg-white rounded-xl p-6 shadow-sm border">

    <h2 className="text-xl font-bold mb-4">
      Garden Statistics
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

      <div>
        <p className="text-3xl font-bold text-green-600">
          {completedTasks.length}
        </p>
        <p className="text-sm text-gray-500">Total Plants</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-purple-600">
          {Object.keys(plantsByCategory).length}
        </p>
        <p className="text-sm text-gray-500">Categories</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-yellow-600">
          {new Set(completedTasks.map(t=>t.plantType)).size}
        </p>
        <p className="text-sm text-gray-500">Plant Types</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-blue-600">
          {completedTasks.length}
        </p>
        <p className="text-sm text-gray-500">This Week</p>
      </div>

    </div>

  </div>

</div>
    </div>
    
  );
}