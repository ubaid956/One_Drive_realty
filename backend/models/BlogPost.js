const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featuredImage: String,
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
