const Task = require("../models/Task");

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// CREATE task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      userId: req.user._id,
    });

    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};