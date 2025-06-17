import Joi from "joi";

export const addCalendarSchema = Joi.object({
  name: Joi.string().max(100).required(),
});

export const updateCalendarSchema = Joi.object({
  name: Joi.string().max(100).required(),
});

export const inviteCalendarSchema = Joi.object({
  userId: Joi.string().max(100).required(),
  permission: Joi.string().valid("read", "write").required(),
});
