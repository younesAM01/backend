import mongoose from 'mongoose';

const ClientPackSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (client)
    required: [true, "Client is required"]
  },
  pack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pack', // Reference to the Pack model
    required: [true, "Pack is required"]
  },
  packPrice: {
    type: Number,
    required: [true, "Pack price is required"]
  },
  finalPrice : {
    type: Number,
    required: [false, "Final price is required"]
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    required: [true, "Expiration date is required"]
  },
  remainingSessions: {
    type: Number,
    required: [true, "Remaining sessions is required"]
  },
  purchaseState: {
    type: String,
    enum: ['completed', 'pending' , 'cancelled'],
    default: 'pending',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  daysBeforeExpiring: {
    type: Number,
    default: function() {
      const today = new Date();
      const expiration = new Date(this.expirationDate);
      const diffTime = expiration - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
  },
});

export default mongoose.models.ClientPack || mongoose.model('ClientPack', ClientPackSchema);
