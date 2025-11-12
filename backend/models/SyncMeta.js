const mongoose = require('mongoose');

const SyncMetaSchema = new mongoose.Schema({
  syncType: {
    type: String,
    enum: ['full', 'incremental'],
    required: true
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'failed'],
    default: 'in_progress'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  stats: {
    created: { type: Number, default: 0 },
    updated: { type: Number, default: 0 },
    deleted: { type: Number, default: 0 },
    errors: { type: Number, default: 0 }
  },
  errors: [{
    mlsId: String,
    message: String,
    timestamp: Date
  }],
  lastSyncToken: String
}, {
  timestamps: true
});

module.exports = mongoose.model('SyncMeta', SyncMetaSchema);
