import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: [30, "First name must be less than 30 characters long"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [3, "Last name must be at least 3 characters long"],
    maxlength: [30, "Last name must be less than 30 characters long"]
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  age: {
    type: Number
  },
  address: {
    type: String,
    trim: true
  },
  profilePic: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['super admin', 'admin', 'client' , 'coach'],
    default: 'client'
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  nationality: {
    type: String,
    trim: true
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);