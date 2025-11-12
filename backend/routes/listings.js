const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// @route   GET /api/listings
// @desc    Get all listings with filters and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      q,
      city,
      state,
      zip,
      minPrice,
      maxPrice,
      beds,
      baths,
      propertyType,
      status = 'Active',
      page = 1,
      limit = 20,
      sort = '-listDate'
    } = req.query;

    // Build query
    const query = { status };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'address.city': { $regex: q, $options: 'i' } }
      ];
    }

    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    if (state) query['address.state'] = state;
    if (zip) query['address.zip'] = zip;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (beds) query.beds = { $gte: parseInt(beds) };
    if (baths) query.baths = { $gte: parseInt(baths) };
    if (propertyType) query.propertyType = propertyType;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Property.countDocuments(query);

    // Execute query
    const properties = await Property.find(query)
      .populate('agentId', 'name email phone photoUrl')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-raw');

    res.json({
      success: true,
      data: properties,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/listings/featured
// @desc    Get featured listings
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const properties = await Property.find({ status: 'Active', featured: true })
      .populate('agentId', 'name email phone photoUrl')
      .sort('-listDate')
      .limit(6)
      .select('-raw');

    res.json({ success: true, data: properties });
  } catch (error) {
    console.error('Get featured listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/listings/:id
// @desc    Get single listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agentId');

    if (!property) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/listings/nearby/:id
// @desc    Get nearby listings based on location
// @access  Public
router.get('/nearby/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const coordinates = property.address.coordinates.coordinates;
    const maxDistance = 5000; // 5km in meters

    const nearbyProperties = await Property.find({
      _id: { $ne: property._id },
      status: 'Active',
      'address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: maxDistance
        }
      }
    })
    .populate('agentId', 'name email phone photoUrl')
    .limit(6)
    .select('-raw');

    res.json({ success: true, data: nearbyProperties });
  } catch (error) {
    console.error('Get nearby listings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
