const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const SyncMeta = require('../models/SyncMeta');
const { triggerSync } = require('../services/nwmlsSync');

const router = express.Router();

// Apply authentication and admin authorization to all routes
router.use(protect);
router.use(authorize('admin'));

// @route   POST /api/admin/sync
// @desc    Trigger manual NWMLS sync
// @access  Private/Admin
router.post('/sync', async (req, res) => {
  try {
    const { syncType = 'incremental' } = req.body;
    
    // Check if sync is already running
    const runningSyncs = await SyncMeta.findOne({ status: 'in_progress' });
    if (runningSyncs) {
      return res.status(400).json({ 
        error: 'Sync already in progress',
        syncId: runningSyncs._id
      });
    }

    // Trigger sync
    const syncId = await triggerSync(syncType);

    res.json({ 
      success: true, 
      message: `${syncType} sync triggered successfully`,
      syncId
    });
  } catch (error) {
    console.error('Trigger sync error:', error);
    res.status(500).json({ error: 'Failed to trigger sync' });
  }
});

// @route   GET /api/admin/sync/status
// @desc    Get sync status and history
// @access  Private/Admin
router.get('/sync/status', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const syncs = await SyncMeta.find()
      .sort('-createdAt')
      .limit(parseInt(limit));

    const lastSync = syncs[0];
    const runningSyncs = await SyncMeta.countDocuments({ status: 'in_progress' });

    res.json({
      success: true,
      data: {
        lastSync,
        history: syncs,
        isRunning: runningSyncs > 0
      }
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const Property = require('../models/Property');
    const Agent = require('../models/Agent');
    const User = require('../models/User');

    const [
      totalListings,
      activeListings,
      soldListings,
      totalAgents,
      totalUsers
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: 'Active' }),
      Property.countDocuments({ status: 'Sold' }),
      Agent.countDocuments({ active: true }),
      User.countDocuments({ active: true })
    ]);

    res.json({
      success: true,
      data: {
        totalListings,
        activeListings,
        soldListings,
        totalAgents,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
