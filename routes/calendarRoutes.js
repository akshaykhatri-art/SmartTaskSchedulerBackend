import express from "express";
import {
  createCalendar,
  getUserCalendars,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
  inviteUserToCalendar,
} from "../controllers/calendarController.js";
import validate from "../middlewares/validate.js";
import {
  addCalendarSchema,
  updateCalendarSchema,
  inviteCalendarSchema,
} from "../validations/calendarValidation.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(addCalendarSchema), createCalendar);
router.get("/", getUserCalendars);
router.get("/:id", getCalendarById);
router.put("/:id", validate(updateCalendarSchema), updateCalendar);
router.delete("/:id", deleteCalendar);
router.post(
  "/:id/invite",
  validate(inviteCalendarSchema),
  inviteUserToCalendar
);

export default router;
