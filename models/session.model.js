import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Client is required"]
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Coach is required"]
  },
  pack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pack',
    required: [true, "Pack is required"]
  },
  sessionDate: {
    type: Date,
    required: [true, "Session date is required"]
  },
  sessionTime: {
    type: String, // Store as 'HH:mm' (e.g., '14:30' for 2:30 PM)
    required: [true, "Session time is required"]
  },
  location: {
    type: String, // Example: 'Gym A, Room 2' or 'Online (Zoom)'
    required: [true, "Location is required"]
  },
   duration: {
    type: Number, // Duration in minutes
    default: 60 // Default duration set to 1 hour (60 minutes)
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'canceled'],
    default: 'scheduled'
  },
}, { timestamps: true });

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
