import Services from "../models/services.model.js";

// Create service
export const createService = async (req, res) => {
  try {
    const service = await Services.create(req.body);
    res.status(201).json({
        success: true,
        message: "Service created successfully",
        service
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({
        success: true,
        message: "Services fetched successfully",
        services
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Get service by id
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with this ${id} not found`
      });
    }
    res.status(200).json({
        success: true,
        message: "Service fetched successfully",
        service
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByIdAndUpdate(id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with this ${id} not found`
      });
    }
    res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByIdAndDelete(id);
    if (!service) { 
      return res.status(404).json({
        success: false,
        message: `Service with this ${id} not found`
      });
    }   
    res.status(200).json({
        success: true,
        message: "Service deleted successfully",
        service
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
};









