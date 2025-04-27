import User from "../models/user.model.js";

export const getUsers= async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            
            users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user,
        });

    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { email, firstName, lastName } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
       
        const user = await User.create({ email, firstName, lastName });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
        
        

    } catch (error) {
        next(error);
    }
}
