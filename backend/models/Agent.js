const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  mlsAgentId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  photoUrl: String,
  bio: String,
  specialties: [String],
  office: {
    name: String,
    phone: String,
    address: {
      line1: String,
      city: String,
      state: String,
      zip: String
    }
  },
  licenseNumber: String,
  yearsExperience: Number,
  languages: [String],
  socialMedia: {
    linkedin: String,
    facebook: String,
    instagram: String,
    twitter: String
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for listing count
AgentSchema.virtual('listingsCount', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'agentId',
  count: true
});

module.exports = mongoose.model('Agent', AgentSchema);
