import mongoose from "mongoose";

const PackSchema = new mongoose.Schema(
  {
    startPrice: {
      type: Number,
      required: [true, "Start price is required"],
    },

    category: {
      en: {
        type: String,
        required: [true, "Category in english is required"],
        unique: [true, "Category in english must be unique"],
      },
      ar: {
        type: String,
        required: [true, "Category in arabic is required"],
        unique: [true, "Category in arabic must be unique"],
      },
    },
    sessions: [
      {
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
        sessionCount: {
          type: Number,
          required: [true, "Session count is required"],
        },
        expirationDays: {
          type: Number,
          required: [true, "Expiration days is required"],
        },
        upsell: {
          type: Number,
        },
      },
    ],
    features: {
      en: {
        type: [String],
        required: [true, "Features in english are required"],
      },
      ar: {
        type: [String],
        required: [true, "Features in arabic are required"],
      },
    },
  },
  { timestamps: true }
);

const Pack = mongoose.models.Pack || mongoose.model("Pack", PackSchema);

export default Pack;
