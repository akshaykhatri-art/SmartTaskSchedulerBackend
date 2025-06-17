import mongoose from "mongoose";

const constraintSchema = new mongoose.Schema(
  {
    startHour: { type: Number, default: 9 }, // e.g. 9 for 9 AM
    endHour: { type: Number, default: 17 }, // e.g. 17 for 5 PM
    excludeDays: [Number], // 0=Sunday, 6=Saturday
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    calendar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calendar",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number, required: true }, // in minutes
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isFlexible: { type: Boolean, default: false },
    constraints: constraintSchema,
    status: {
      type: String,
      enum: ["pending", "scheduled", "conflict", "completed"],
      default: "pending",
    },
    reminder: { type: Boolean, default: false },
    reminderTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
