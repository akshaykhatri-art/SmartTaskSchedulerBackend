import Task from "../models/Task.js";
import Calendar from "../models/Calendar.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { calendar, title, duration, ...rest } = req.body;

    // Check if user has access to calendar
    const cal = await Calendar.findById(calendar);
    if (
      !cal ||
      (cal.owner.toString() !== req.user.id &&
        !cal.sharedWith.some((u) => u.user.toString() === req.user.id))
    ) {
      return res.status(403).json({ error: "No access to calendar" });
    }

    const task = await Task.create({
      calendar,
      title,
      duration,
      ...rest,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Get Tasks in a Calendar
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ calendar: req.params.calendarId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get Single Task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error getting task" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
