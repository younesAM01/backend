import mongoose from 'mongoose'

const ServicesSchema = new mongoose.Schema({
  title: {
    en: {
      type: String,
      required: false,
      default: ""
    },
    ar: {
      type: String,
      required: false,
      default: ""
    }
  },
  description: {
    en: {
      type: String,
      required: false,
      default: ""
    },
    ar: {
      type: String,
      required: false,
      default: ""
    }
  },
  image: { 
    type: String,
    required: [true, "Image is required"]
  },
  
}, { timestamps: true });


export default mongoose.models.Services || mongoose.model('Services', ServicesSchema)