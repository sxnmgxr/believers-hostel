const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const amenityRoutes = require('./amenityRoutes');
const settingRoutes = require('./settingRoutes');

// Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/amenities', amenityRoutes);
router.use('/settings', settingRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is working',
    timestamp: new Date()
  });
});

module.exports = router;
