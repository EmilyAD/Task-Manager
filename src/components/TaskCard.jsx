export default function TaskCard({ task, onComplete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">

      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {task.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {task.description}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        Category: {task.category}
      </p>

      <button
        onClick={onComplete}
        className="mt-4 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
      >
        Complete
      </button>

    </div>
  );
}