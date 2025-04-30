import Session from "../models/session.model.js";
import { sendSessionNotifications } from "../utils/send-email.js";

// Create session
export const createSession = async (req, res) => {
  try {
    // Create the session
    const session = await Session.create(req.body);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not created",
      });
    }

    // Fetch coach and client details to include in emails
    // This assumes your Session model references coach and client IDs
    const populatedSession = await Session.findById(session._id)
      .populate("coach", "firstName lastName email") // Adjust fields as needed
      .populate("client", "firstName lastName email"); // Adjust fields as needed

    if (!populatedSession.coach || !populatedSession.client) {
      // Still return success but note the email wasn't sent
      return res.status(201).json({
        success: true,
        message:
          "Session created successfully, but notification emails could not be sent due to missing coach or client information",
        session,
      });
    }

    // Send email notifications
    const emailResult = await sendSessionNotifications(populatedSession);

    // Return success response, including email status
    res.status(201).json({
      success: true,
      message: emailResult.success
        ? "Session created successfully and notifications sent"
        : "Session created successfully, but there was an issue sending notifications",
      session,
      emailNotifications: emailResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("client")
      .populate("coach")
      .populate("pack");
    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get session by id
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate("client")
      .populate("coach")
      .populate("pack");
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session fetched successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get sessions by client id
export const getSessionsByClientId = async (req, res) => {
  try {
    const { id } = req.params;
    const sessions = await Session.find({ client: id });
    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session updated successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel session
export const cancelSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, {status: "cancelled"});
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session cancelled successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Complete session
export const completeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, { status: "completed" });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session completed successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
