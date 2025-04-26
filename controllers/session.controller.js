import Session from "../models/session.model.js";

// Create session
export const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not created"
      });
    }
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("client").populate("coach").populate("pack");
    res.status(200).json({
        success: true,
        message: "Sessions fetched successfully",
        sessions
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Get session by id
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id).populate("client").populate("coach").populate("pack");
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`
      });
    }
    res.status(200).json({
        success: true,
        message: "Session fetched successfully",
        session
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Update session
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, req.body, { new: true });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`
      });
    }
    res.status(200).json({
        success: true,
        message: "Session updated successfully",
        session
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Delete session
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndDelete(id);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `Session with this ${id} not found`
      });
    }
    res.status(200).json({
        success: true,
        message: "Session deleted successfully",
        session
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};




