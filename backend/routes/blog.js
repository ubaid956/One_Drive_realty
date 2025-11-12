const express = require('express');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { tag, page = 1, limit = 10 } = req.query;

    const query = { published: true };
    if (tag) query.tags = tag;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await BlogPost.countDocuments(query);

    const posts = await BlogPost.find(query)
      .populate('author', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-publishedAt')
      .select('-content');

    res.json({
      success: true,
      data: posts,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
      .populate('author', 'name photoUrl');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/blog/related/:slug
// @desc    Get related blog posts
// @access  Public
router.get('/related/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      published: true,
      tags: { $in: post.tags }
    })
      .populate('author', 'name')
      .limit(3)
      .sort('-publishedAt')
      .select('-content');

    res.json({ success: true, data: relatedPosts });
  } catch (error) {
    console.error('Get related posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
