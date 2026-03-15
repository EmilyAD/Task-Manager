import { useState } from "react";

export default function AllTasks() {
  const [search, setSearch] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Write and submit the Q2 proposal",
      category: "Work",
      progress: 75,
      due: "Mar 20",
      icon: "🌱"
    },
    {
      id: 2,
      title: "Team meeting preparation",
      description: "Prepare slides for weekly meeting",
      category: "Work",
      progress: 50,
      due: "Mar 17",
      icon: "🌿"
    },
    {
      id: 3,
      title: "Grocery shopping",
      description: "Buy ingredients for meals",
      category: "Personal",
      progress: 25,
      due: "Mar 16",
      icon: "🌻"
    },
    {
      id: 4,
      title: "Morning meditation",
      description: "Daily 15-minute meditation",
      category: "Personal",
      progress: 100,
      due: "Mar 15",
      icon: "🌸"
    },
    {
      id: 5,
      title: "Read Atomic Habits",
      description: "Continue reading the book",
      category: "Learning",
      progress: 100,
      due: "Mar 14",
      icon: "🌼"
    }
  ];

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          All Tasks
        </h1>

        <p className="text-gray-500">
          Manage and track all your growing tasks
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-white rounded-xl border p-5 space-y-4">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="px-4 py-2 border rounded-lg">
            <option>All Tasks</option>
            <option>Active</option>
            <option>Completed</option>
          </select>

          <select className="px-4 py-2 border rounded-lg">
            <option>Due Date</option>
            <option>Name</option>
          </select>

        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex gap-3">

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            All Categories
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Work
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Personal
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Learning
          </button>

        </div>

      </div>

      {/* TASK COUNT */}
      <p className="text-gray-500">
        Showing {tasks.length} tasks
      </p>

      {/* TASK GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl border p-5 shadow-sm space-y-3"
          >

            {/* HEADER */}
            <div className="flex justify-between">

              <div className="flex gap-3">

                <span className="text-3xl">
                  {task.icon}
                </span>

                <div>

                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {task.description}
                  </p>

                </div>

              </div>

              <input type="checkbox" />

            </div>

            {/* PROGRESS */}
            <div>

              <div className="h-2 bg-gray-200 rounded">

                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${task.progress}%` }}
                />

              </div>

              <p className="text-right text-sm text-gray-500">
                {task.progress}%
              </p>

            </div>

            {/* CATEGORY + DATE */}
            <div className="flex justify-between text-sm">

              <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full">
                {task.category}
              </span>

              <span className="text-gray-500">
                📅 {task.due}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}