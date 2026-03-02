const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('text', 'number', 'boolean', 'json', 'array'),
      defaultValue: 'text'
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'general'
    },
    description: {
      type: DataTypes.TEXT
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_public'
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.UUID,
      field: 'updated_by'
    }
  }, {
    timestamps: true,
    tableName: 'Settings', // Explicitly set table name
    underscored: true,
    paranoid: false // Settings shouldn't be soft deleted
  });

  return Setting;
};
