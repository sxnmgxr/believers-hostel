const express = require('express');
const router = express.Router();
const {
  getAllRoomsPublic,
  getRoomByIdPublic,
  getRoomTypes,
  createRoom,
  updateRoom,
  deleteRoom,
  checkAvailability
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/public', getAllRoomsPublic);
router.get('/public/:id', getRoomByIdPublic);
router.get('/types', getRoomTypes);
router.get('/:id/availability', checkAvailability);

// Admin routes
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createRoom);
router.put('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateRoom);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteRoom);

module.exports = router;
