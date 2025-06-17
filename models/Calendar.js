import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        permission: { type: String, enum: ["read", "write"], default: "read" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Calendar", calendarSchema);
