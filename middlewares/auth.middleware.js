import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// authorize user
const authorize = async (req, res, next) => {
  try {
   let token 
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
   }
   if(!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
   }
   const decoded = jwt.verify(token, JWT_SECRET);

   const user = await User.findById(decoded.userId);

   if(!user) return res.status(401).json({
    success: false,
    message: "Unauthorized",
   });
  
   req.user = user;
   next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};

// authorize admin
const authorizeAdmin = async (req, res, next) => {
    try{
        let token 
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user) return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        if(user.role !== "admin") {
            const error = new Error("Only admins can access this route");
            error.statusCode = 401;
            throw error;
        }
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message,
        });
    }
}

export {authorize, authorizeAdmin};

