const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    category: { type: String, default: "General" },
    plantType: { type: String, default: "🌱" },
    dueDate: { type: Date },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// In models/Task.js - add this field to the schema
subtasks: [
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false }
  }
]
module.exports = mongoose.model("Task", taskSchema);