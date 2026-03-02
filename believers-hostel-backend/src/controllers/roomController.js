const { Room, RoomType, Amenity } = require('../models');
const logger = require('../config/logger');

// @desc    Get all rooms (public)
// @route   GET /api/v1/rooms/public
// @access  Public
const getAllRoomsPublic = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      where: { status: 'AVAILABLE' },
      include: [
        {
          model: RoomType,
          as: 'roomType',
          attributes: ['id', 'name', 'capacity']
        },
        {
          model: Amenity,
          as: 'amenities',
          through: { 
            attributes: [] 
          },
          attributes: ['id', 'name', 'icon', 'category']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    logger.error('Get all rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single room (public)
// @route   GET /api/v1/rooms/public/:id
// @access  Public
const getRoomByIdPublic = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id, {
      include: [
        {
          model: RoomType,
          as: 'roomType'
        },
        {
          model: Amenity,
          as: 'amenities',
          through: { 
            attributes: [] 
          }
        }
      ]
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    logger.error('Get room by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get room types
// @route   GET /api/v1/rooms/types
// @access  Public
const getRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.findAll({
      where: { isActive: true },
      order: [['base_price', 'ASC']]
    });

    res.json({
      success: true,
      data: roomTypes
    });
  } catch (error) {
    logger.error('Get room types error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Check room availability
// @route   GET /api/v1/rooms/:id/availability
// @access  Public
const checkAvailability = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    const availableBeds = room.totalBeds - room.occupiedBeds;

    res.json({
      success: true,
      data: {
        roomId: room.id,
        roomNumber: room.roomNumber,
        totalBeds: room.totalBeds,
        occupiedBeds: room.occupiedBeds,
        availableBeds,
        status: room.status,
        isAvailable: availableBeds > 0 && room.status === 'AVAILABLE'
      }
    });
  } catch (error) {
    logger.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Admin routes (to be implemented with auth)
const createRoom = async (req, res) => {
  res.json({ message: 'Create room - to be implemented' });
};

const updateRoom = async (req, res) => {
  res.json({ message: 'Update room - to be implemented' });
};

const deleteRoom = async (req, res) => {
  res.json({ message: 'Delete room - to be implemented' });
};

module.exports = {
  getAllRoomsPublic,
  getRoomByIdPublic,
  getRoomTypes,
  checkAvailability,
  createRoom,
  updateRoom,
  deleteRoom
};
