import { useLocation, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";

const plantTypes = [
  { emoji: "🌱", name: "Seedling" },
  { emoji: "🌿", name: "Herb" },
  { emoji: "🌸", name: "Cherry Blossom" },
  { emoji: "🌻", name: "Sunflower" },
  { emoji: "🌺", name: "Hibiscus" },
  { emoji: "🌹", name: "Rose" },
  { emoji: "🌷", name: "Tulip" },
  { emoji: "🌼", name: "Daisy" },
  { emoji: "🪴", name: "Potted Plant" },
  { emoji: "🌾", name: "Rice Plant" },
];

const categories = ["Work", "Personal", "Learning", "Health", "Finance", "Other"];

export default function AddEditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTask, updateTask } = useApp();

  const existingTask = location.state?.task || null;
  const isEditing = !!existingTask;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Work",
    plantType: "🌱",
    dueDate: "",
    
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");   // backend error
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    if (existingTask) {
      setFormData({
        ...existingTask,
        
      });
    }
  }, [existingTask]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    // ✅ Description is now optional (removed validation)

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  setApiError("");
  setLoading(true);
  try {
    if (isEditing && existingTask) {
      await updateTask(existingTask._id || existingTask.id, formData);
    } else {
      await addTask(formData);
    }
    navigate("/tasks");
  } catch (err) {
    setApiError(err.response?.data?.message || "Failed to save task. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Link
        to="/tasks"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to tasks
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h1>
        <p className="text-gray-500 mt-1 dark:text-gray-300">
          {isEditing ? "Update your task details" : "Plant a new seed in your productivity garden"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 space-y-8"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Task Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border ${
              errors.title ? "border-red-500" : "border-gray-200 dark:border-gray-700"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white`}
            placeholder="e.g., Complete project proposal"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* DESCRIPTION (now optional) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            placeholder="Describe your task..."
          />
        </div>

        

          


        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* DUE DATE */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Due Date *</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border ${
              errors.dueDate ? "border-red-500" : "border-gray-200 dark:border-gray-700"
            } rounded-xl`}
          />
          {errors.dueDate && (
            <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
          )}
        </div>

        {/* PLANTS */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
            Choose Your Plant
          </label>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4">
            {plantTypes.map((plant) => (
              <button
                key={plant.emoji}
                type="button"
                onClick={() => setFormData({ ...formData, plantType: plant.emoji })}
                className={`flex flex-col items-center justify-center rounded-xl border-2 transition 
                  ${
                    formData.plantType === plant.emoji
                      ? "border-green-500 bg-green-50 dark:bg-green-800"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                  } 
                  text-gray-900 dark:text-white h-20 sm:h-28`}
              >
                <span className="text-2xl sm:text-3xl">{plant.emoji}</span>
                <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 mt-1 text-center px-1">
                  {plant.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="flex-1 py-3 bg-gray-200 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl disabled:opacity-60"
          >
          <Save className="w-5 h-5" />
            {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}