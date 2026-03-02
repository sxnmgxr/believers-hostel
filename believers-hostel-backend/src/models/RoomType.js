const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'capacity'
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'base_price'
    },
    semesterDiscount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      field: 'semester_discount'
    },
    annualDiscount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      field: 'annual_discount'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: [],
      field: 'features'
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
    paranoid: true,
    tableName: 'RoomTypes',
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  RoomType.associate = (models) => {
    RoomType.hasMany(models.Room, { 
      foreignKey: 'roomTypeId', 
      as: 'rooms' 
    });
  };

  return RoomType;
};
