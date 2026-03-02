const express = require('express');
const router = express.Router();
const {
  getPublicSettings,
  getAllSettings,
  updateSetting,
  createSetting,
  deleteSetting
} = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public', getPublicSettings);

// Admin routes
router.get('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), getAllSettings);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createSetting);
router.put('/:key', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateSetting);
router.delete('/:key', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteSetting);

module.exports = router;
