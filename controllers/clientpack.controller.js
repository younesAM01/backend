
import ClientPack from "../models/clientpack.model.js";

// Create client pack
export const createClientPack = async (req, res) => {
  try {
   
    const clientPack = await ClientPack.create(req.body);
    if (!clientPack) {
      return res.status(404).json({ 
        success: false,
        message: "Client pack not created" 
      });
    }
    res.status(201).json({
        success: true,
        message: "Client pack created successfully",
        clientPack
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all client packs
export const getAllClientPacks = async (req, res) => {
  try {
    const clientPacks = await ClientPack.find().populate("pack");
    res.status(200).json({
        success: true,
        message: "Client packs fetched successfully",
        clientPacks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get client pack by id
export const getClientPackById = async (req, res) => {
 try {
    const { id } = req.params;
    const clientPack = await ClientPack.findById(id).populate("pack");
    if (!clientPack) {
      return res.status(404).json({ 
        success: false,
        message: `Client pack with this ${id} not found` 
      });
    }
    res.status(200).json({
        success: true,
        message: "Client pack fetched successfully",
        clientPack 
    });
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};

// Update client pack
export const updateClientPack = async (req, res) => {
  try {
    const { id } = req.params;
    const clientPack = await ClientPack.findByIdAndUpdate(id, req.body, { new: true });
    if (!clientPack) {
      return res.status(404).json({ 
        success: false,
        message: `Client pack with this ${id} not found` 
      });
    }
    res.status(200).json({
        success: true,
        message: "Client pack updated successfully",
     clientPack
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete client pack
export const deleteClientPack = async (req, res) => {
  try {
    const { id } = req.params;  
    const clientPack = await ClientPack.findByIdAndDelete(id);
    if (!clientPack) {
      return res.status(404).json({ 
        success: false,
        message: `Client pack with this ${id} not found` 
      });
    }
    res.status(200).json({
        success: true,
        message: "Client pack deleted successfully",
        clientPack
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







