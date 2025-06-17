import Calendar from "../models/Calendar.js";

// Create Calendar
export const createCalendar = async (req, res) => {
  try {
    const { name } = req.body;
    const calendarExists = await Calendar.findOne({ name });
    if (calendarExists) {
      return res
        .status(400)
        .json({ error: "Calendar with this name already exists" });
    }

    const calendar = await Calendar.create({ name, owner: req.user.id });
    res.status(201).json(calendar);
  } catch (err) {
    res.status(500).json({ error: "Failed to create calendar" });
  }
};

// Get All Calendars for User (Owned + Shared)
export const getUserCalendars = async (req, res) => {
  try {
    const calendars = await Calendar.find({
      $or: [{ owner: req.user.id }, { "sharedWith.user": req.user.id }],
    });
    res.json(calendars);
  } catch (err) {
    res.status(500).json({ error: "Failed to get calendars" });
  }
};

// Get One Calendar
export const getCalendarById = async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.id);
    if (!calendar) return res.status(404).json({ error: "Not found" });

    if (
      calendar.owner.toString() !== req.user.id &&
      !calendar.sharedWith.some((s) => s.user.toString() === req.user.id)
    )
      return res.status(403).json({ error: "Access denied" });

    res.json(calendar);
  } catch (err) {
    res.status(500).json({ error: "Failed to get calendar" });
  }
};

// Update Calendar
export const updateCalendar = async (req, res) => {
  try {
    const { name } = req.body;
    const calendar = await Calendar.findById(req.params.id);

    // Check ownership
    if (!calendar || calendar.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    // Check for name conflict with another calendar (excluding current one)
    if (name && name !== calendar.name) {
      const nameExists = await Calendar.findOne({ name });
      if (nameExists && nameExists._id.toString() !== calendar._id.toString()) {
        return res
          .status(400)
          .json({ error: "Calendar with this name already exists" });
      }
      calendar.name = name;
    }

    await calendar.save();
    res.json({
      message: "Calendar updated successfully",
      calendar,
    });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete Calendar
export const deleteCalendar = async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.id);
    if (!calendar || calendar.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    await Calendar.deleteOne({ _id: calendar._id });
    res.json({ message: "Calendar deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// Invite User to Calendar
export const inviteUserToCalendar = async (req, res) => {
  try {
    const { userId, permission } = req.body;
    const calendar = await Calendar.findById(req.params.id);

    if (!calendar || calendar.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    const alreadyInvited = calendar.sharedWith.find(
      (s) => s.user.toString() === userId
    );
    if (alreadyInvited) {
      alreadyInvited.permission = permission;
    } else {
      calendar.sharedWith.push({ user: userId, permission });
    }

    await calendar.save();
    res.json({
      message: "Invite sent",
      calendar,
    });
  } catch (err) {
    res.status(500).json({ error: "Invite failed" });
  }
};
