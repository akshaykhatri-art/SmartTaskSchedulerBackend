import Joi from "joi";

export const addTaskSchema = Joi.object({
  calendar: Joi.string().length(24).required(),
  title: Joi.string().max(200).required(),
  description: Joi.string().allow(""),
  startTime: Joi.date(),
  endTime: Joi.date(),
  duration: Joi.number().min(1).required(),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  isFlexible: Joi.boolean().default(false),
  constraints: Joi.object({
    startHour: Joi.number().min(0).max(23).default(9),
    endHour: Joi.number().min(0).max(23).default(17),
    excludeDays: Joi.array().items(Joi.number().min(0).max(6)).default([]),
  }).optional(),
  status: Joi.string()
    .valid("pending", "scheduled", "conflict", "completed")
    .default("pending"),
  reminder: Joi.boolean().default(false),
  reminderTime: Joi.date().optional(),
});

export const updateTaskSchema = Joi.object({
  calendar: Joi.string().length(24).required(),
  title: Joi.string().max(200),
  description: Joi.string().allow(""),
  startTime: Joi.date(),
  endTime: Joi.date(),
  duration: Joi.number().min(1),
  priority: Joi.string().valid("low", "medium", "high"),
  isFlexible: Joi.boolean(),
  constraints: Joi.object({
    startHour: Joi.number().min(0).max(23),
    endHour: Joi.number().min(0).max(23),
    excludeDays: Joi.array().items(Joi.number().min(0).max(6)),
  }),
  status: Joi.string().valid("pending", "scheduled", "conflict", "completed"),
  reminder: Joi.boolean(),
  reminderTime: Joi.date(),
});
