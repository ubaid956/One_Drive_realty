const express = require('express');
const Agent = require('../models/Agent');
const Property = require('../models/Property');

const router = express.Router();

// @route   GET /api/agents
// @desc    Get all agents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { name, city, page = 1, limit = 12 } = req.query;

    const query = { active: true };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (city) query['office.address.city'] = { $regex: city, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Agent.countDocuments(query);

    const agents = await Agent.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort('name');

    res.json({
      success: true,
      data: agents,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/agents/:id
// @desc    Get single agent by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({ success: true, data: agent });
  } catch (error) {
    console.error('Get agent error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/agents/:id/listings
// @desc    Get all listings for a specific agent
// @access  Public
router.get('/:id/listings', async (req, res) => {
  try {
    const { page = 1, limit = 20, status = 'Active' } = req.query;

    const query = { agentId: req.params.id, status };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Property.countDocuments(query);

    const listings = await Property.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-listDate')
      .select('-raw');

    res.json({
      success: true,
      data: listings,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get agent listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
