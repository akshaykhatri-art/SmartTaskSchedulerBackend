import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import validate from "../middlewares/validate.js";
import {
  addTaskSchema,
  updateTaskSchema,
} from "../validations/taskValidation.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(addTaskSchema), createTask);
router.get("/:calendarId", getTasks);
router.get("/single/:id", getTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
