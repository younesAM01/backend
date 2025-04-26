import Pack from "../models/pack.model.js";

// Get all packs
export const getAllPacks = async (req, res) => {
  try {
    const packs = await Pack.find();
    res.status(200).json({
      success: true,
      message: "Packs fetched successfully",
      packs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pack by id
export const getPackById = async (req, res) => {
  try {
    const { id } = req.params;
    const pack = await Pack.findById(id);
    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }
    res.status(200).json({
      success: true,
      message: "Pack fetched successfully",
      pack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create pack
export const createPack = async (req, res) => {
  try {
    const { startPrice, category, sessions, features } = req.body;
    if (!startPrice || !category || !sessions || !features) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const pack = await Pack.create({
      startPrice,
      category,
      sessions,
      features,
    });
    res.status(201).json({
      success: true,
      message: "Pack created successfully",
      pack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pack
export const updatePack = async (req, res) => {
  try {
    const { id } = req.params;
   
    const pack = await Pack.findByIdAndUpdate(id, req.body, { new: true });
    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }
    res.status(200).json({
      success: true,
      message: "Pack updated successfully",
      pack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete pack
export const deletePack = async (req, res) => {
  try {
    const { id } = req.params;
    const pack = await Pack.findByIdAndDelete(id);
    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }
    res.status(200).json({
      success: true,
      message: "Pack deleted successfully",
      pack,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




