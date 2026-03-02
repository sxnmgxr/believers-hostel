const { Setting } = require('../models');
const logger = require('../config/logger');

// @desc    Get public settings
// @route   GET /api/v1/settings/public
// @access  Public
const getPublicSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({
      where: { isPublic: true },
      attributes: ['key', 'value', 'type', 'category']
    });

    // Convert to key-value object
    const settingsObj = {};
    settings.forEach(setting => {
      let value = setting.value;
      
      // Parse based on type
      if (setting.type === 'number') {
        value = parseFloat(value);
      } else if (setting.type === 'boolean') {
        value = value === 'true';
      } else if (setting.type === 'json') {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Keep as string if parse fails
        }
      }
      
      settingsObj[setting.key] = value;
    });

    res.json({
      success: true,
      data: settingsObj
    });
  } catch (error) {
    logger.error('Get public settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all settings (admin)
// @route   GET /api/v1/settings
// @access  Private/Admin
const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({
      order: [['category', 'ASC'], ['key', 'ASC']]
    });

    // Group by category
    const grouped = settings.reduce((acc, setting) => {
      const category = setting.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(setting);
      return acc;
    }, {});

    res.json({
      success: true,
      count: settings.length,
      data: settings,
      grouped
    });
  } catch (error) {
    logger.error('Get all settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update setting (admin)
// @route   PUT /api/v1/settings/:key
// @access  Private/Admin
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await Setting.findOne({ where: { key } });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    // Convert value based on type
    let processedValue = value;
    if (setting.type === 'number') {
      processedValue = value.toString();
    } else if (setting.type === 'boolean') {
      processedValue = value ? 'true' : 'false';
    } else if (setting.type === 'json') {
      processedValue = JSON.stringify(value);
    } else {
      processedValue = String(value);
    }

    await setting.update({ value: processedValue });

    res.json({
      success: true,
      message: 'Setting updated successfully',
      data: setting
    });
  } catch (error) {
    logger.error('Update setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create setting (admin)
// @route   POST /api/v1/settings
// @access  Private/Admin
const createSetting = async (req, res) => {
  try {
    const setting = await Setting.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Setting created successfully',
      data: setting
    });
  } catch (error) {
    logger.error('Create setting error:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Setting with this key already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete setting (admin)
// @route   DELETE /api/v1/settings/:key
// @access  Private/Admin
const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ 
      where: { key: req.params.key } 
    });
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    await setting.destroy();

    res.json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    logger.error('Delete setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getPublicSettings,
  getAllSettings,
  updateSetting,
  createSetting,
  deleteSetting
};
