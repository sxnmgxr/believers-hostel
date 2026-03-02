const { Amenity } = require('../models');
const logger = require('../config/logger');

// @desc    Get all amenities
// @route   GET /api/v1/amenities
// @access  Public
const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.findAll({
      where: { isActive: true },
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    // Group by category
    const grouped = amenities.reduce((acc, amenity) => {
      const category = amenity.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(amenity);
      return acc;
    }, {});

    res.json({
      success: true,
      count: amenities.length,
      data: amenities,
      grouped
    });
  } catch (error) {
    logger.error('Get all amenities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single amenity
// @route   GET /api/v1/amenities/:id
// @access  Public
const getAmenityById = async (req, res) => {
  try {
    const amenity = await Amenity.findByPk(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: 'Amenity not found'
      });
    }

    res.json({
      success: true,
      data: amenity
    });
  } catch (error) {
    logger.error('Get amenity by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create amenity (admin)
// @route   POST /api/v1/amenities
// @access  Private/Admin
const createAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Amenity created successfully',
      data: amenity
    });
  } catch (error) {
    logger.error('Create amenity error:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Amenity with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update amenity (admin)
// @route   PUT /api/v1/amenities/:id
// @access  Private/Admin
const updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByPk(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: 'Amenity not found'
      });
    }

    await amenity.update(req.body);

    res.json({
      success: true,
      message: 'Amenity updated successfully',
      data: amenity
    });
  } catch (error) {
    logger.error('Update amenity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete amenity (admin)
// @route   DELETE /api/v1/amenities/:id
// @access  Private/Admin
const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByPk(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: 'Amenity not found'
      });
    }

    await amenity.destroy();

    res.json({
      success: true,
      message: 'Amenity deleted successfully'
    });
  } catch (error) {
    logger.error('Delete amenity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity
};
