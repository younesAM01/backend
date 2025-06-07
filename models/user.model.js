import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  paragraphs: {
    en: [{ type: String, required: true }],
    ar: [{ type: String, required: true }],
  },
  languages: [
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
});

const SpecialtySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
});

const CertificationSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  org: {
    type: String,
    default: "",
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [30, "First name must be less than 30 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [30, "Last name must be less than 30 characters long"],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    supabaseId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["super admin", "admin", "coach", "client"],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    aboutContent: { type: AboutSchema, required: false },
    specialties: [{ type: SpecialtySchema, required: false }],
    certifications: [{ type: CertificationSchema, required: false }],
    hoverImage: {
      type: String,
      trim: true,
    },
    title: {
      ar: { type: String },
      en: { type: String },
    },
    available: {
      en: {
        type: String,
        enum: ["Available only for women", "Available for all"],
        required: false,
      },
      ar: {
        type: String,
        enum: ["متاح للنساء فقط", "متاح للجميع"],
        required: false,
      },
    },
    // New field for coach available time
    availableTime: {
      startTime: {
        type: String,
        default: "06:00",
        validate: {
          validator: function (v) {
            return /^([0-1][0-9]|2[0-2]):[0-5][0-9]$/.test(v);
          },
          message: "Start time must be in HH:MM format (06-22)",
        },
      },
      endTime: {
        type: String,
        default: "23:00",
        validate: {
          validator: function (v) {
            return /^([0-1][0-9]|2[0-2]):[0-5][0-9]$/.test(v);
          },
          message: "End time must be in HH:MM format (06-22)",
        },
      },
    },
    coachnamearabic: {
      type: String,
    },
    coachActive: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    diseases: {
      type: [String],
      default: [],
    },
    preferredLanguage: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    goals: {
      type: [String],
      default: [],
    },
    provider: {
      type: String,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add validation to ensure end time is after start time
UserSchema.pre("save", function (next) {
  if (
    this.availableTime &&
    this.availableTime.startTime &&
    this.availableTime.endTime
  ) {
    const startTime = new Date(`2000-01-01T${this.availableTime.startTime}:00`);
    const endTime = new Date(`2000-01-01T${this.availableTime.endTime}:00`);

    if (startTime >= endTime) {
      return next(new Error("End time must be after start time"));
    }

    // Ensure times are within the allowed range (8 AM to 12 PM)
    const minTime = new Date(`2000-01-01T08:00:00`);
    const maxTime = new Date(`2000-01-01T12:00:00`);

    if (startTime < minTime || startTime > maxTime) {
      return next(new Error("Start time must be between 8:00 AM and 12:00 PM"));
    }

    if (endTime < minTime || endTime > maxTime) {
      return next(new Error("End time must be between 8:00 AM and 12:00 PM"));
    }
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
