const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  mlsId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  listDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  address: {
    line1: String,
    line2: String,
    city: { type: String, index: true },
    state: { type: String, default: 'WA' },
    zip: { type: String, index: true },
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  propertyType: {
    type: String,
    enum: ['House', 'Condo', 'Townhouse', 'Multi-Family', 'Land', 'Commercial'],
    index: true
  },
  beds: {
    type: Number,
    required: true,
    index: true
  },
  baths: {
    type: Number,
    required: true,
    index: true
  },
  sqft: Number,
  lotSize: Number,
  yearBuilt: Number,
  images: [{
    url: String,
    caption: String,
    order: Number
  }],
  features: [String],
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    index: true
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Sold', 'Removed'],
    default: 'Active',
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  raw: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Geospatial index for location-based queries
PropertySchema.index({ 'address.coordinates': '2dsphere' });

// Compound indexes for common queries
PropertySchema.index({ price: 1, beds: 1, baths: 1 });
PropertySchema.index({ 'address.city': 1, price: 1 });
PropertySchema.index({ status: 1, listDate: -1 });

module.exports = mongoose.model('Property', PropertySchema);
