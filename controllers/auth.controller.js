import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import mongoose from "mongoose";
import {sendConfirmationEmail} from "../utils/send-email.js";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password, firstName, lastName } = req.body;
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const users = await User.create(
      [{ email, password: hashedPassword, firstName, lastName }],
      { session }
    );
    const newUser = users[0]; // Get the first (and only) user from the array

    // generate token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // send email
    await sendConfirmationEmail(newUser, token);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 404;
      throw error;
    }

    if (!user.isEmailConfirmed) {
      const error = new Error("Please Confirm your email before Sign In");
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

     // ✅ Set token in an httpOnly cookie
     res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true if using HTTPS
      sameSite: 'Lax',
      maxAge: 3600000, // 1 hour in ms
    });
      
    res.status(200).json({
      success: true,
      message: "User Sign in successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: "User signed out successfully",
  });
};


export const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      const error = new Error("token is required");
      error.statusCode = 400;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (user.isEmailConfirmed) {
      return res.status(200).json({
        success: true,
        message: "Email already confirmed",
      });
    }

    user.isEmailConfirmed = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email confirmed successfully",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token";
      error.statusCode = 400;
    }
    next(error);
  }
};

// Add a resend confirmation email endpoint
export const resendConfirmationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (user.isEmailConfirmed) {
      return res.status(200).json({
        success: true,
        message: "Email already confirmed",
      });
    }

    // Generate new confirmation token
    const emailConfirmationToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send confirmation email
    await sendConfirmationEmail(user, emailConfirmationToken);

    res.status(200).json({
      success: true,
      message: "Confirmation email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
