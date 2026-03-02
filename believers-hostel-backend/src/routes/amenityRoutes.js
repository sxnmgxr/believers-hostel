const express = require('express');
const router = express.Router();
const {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity
} = require('../controllers/amenityController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllAmenities);
router.get('/:id', getAmenityById);

// Admin routes
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createAmenity);
router.put('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateAmenity);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteAmenity);

module.exports = router;
