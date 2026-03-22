import { Circle, CheckCircle } from "lucide-react";

export default function TaskCard({ task, onComplete }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3">
          <div className="text-3xl mt-1">
            {task.plantType}
          </div>

          <div>
            <h3 className={`font-semibold text-lg ${
              task.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}>
              {task.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {task.description}
            </p>
          </div>
        </div>

        <button onClick={onComplete}>
          {task.completed ? (
            <CheckCircle className="text-green-500 w-6 h-6" />
          ) : (
            <Circle className="text-gray-400 w-6 h-6" />
          )}
        </button>

      </div>

      {/* GROWTH */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Growth</span>
          <span>{task.growthStage}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${task.growthStage}%` }}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
          {task.category}
        </span>

        <span className="text-gray-500">
          📅 {task.dueDate}
        </span>
      </div>

    </div>
  );
}