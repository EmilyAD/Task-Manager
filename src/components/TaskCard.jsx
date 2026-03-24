import { Circle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const getProgress = (task) => {
  if (!task.subtasks || task.subtasks.length === 0) {
    return task.completed ? 100 : 0;
  }

  const done = task.subtasks.filter(st => st.done).length;
  return Math.round((done / task.subtasks.length) * 100);
};
export default function TaskCard({ task, onComplete, toggleSubtask }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/add-task", { state: { task } });
  };

  return (
    <div
      onClick={handleEditClick}
      className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="text-3xl mt-1">{task.plantType}</div>

          <div>
            <h3
              className={`font-semibold text-lg ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>

            <p className="text-gray-500 dark:text-gray-300 text-sm">{task.description}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onComplete();
          }}
        >
          {task.completed ? (
            <CheckCircle className="text-green-500 w-6 h-6" />
          ) : (
            <Circle className="text-gray-400 dark:text-gray-300 w-6 h-6" />
          )}
        </button>
      </div>

      {/* GROWTH */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300 mb-1">
          <span>Growth</span>
          <span>{getProgress(task)}%</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
style={{ width: `${getProgress(task)}%` }}          />
        </div>
      </div>

<div className="mt-3 space-y-1">
  {task.subtasks?.map(st => (
    <div key={st.id} className="flex items-center gap-2 text-sm">
     <input
  type="checkbox"
  checked={!!st.done}
  onClick={(e) => e.stopPropagation()}
  onChange={(e) => {
    e.stopPropagation();
    toggleSubtask(task.id, st.id);
  }}
/>
      <span className={st.done ? "line-through text-gray-400" : ""}>
        {st.text}
      </span>
    </div>
  ))}
</div>

      {/* FOOTER */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 text-xs font-medium">
          {task.category}
        </span>

<span className="text-gray-500 dark:text-gray-300">
  {formatDate(task.dueDate)}
</span>
      </div>
    </div>
  );
}