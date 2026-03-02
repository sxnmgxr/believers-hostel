const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'room_number'
    },
    roomTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'room_type_id'
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'floor'
    },
    block: {
      type: DataTypes.STRING,
      defaultValue: 'A',
      field: 'block'
    },
    status: {
      type: DataTypes.ENUM('AVAILABLE', 'OCCUPIED', 'PARTIALLY_OCCUPIED', 'MAINTENANCE', 'RESERVED'),
      defaultValue: 'AVAILABLE',
      field: 'status'
    },
    totalBeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'total_beds'
    },
    occupiedBeds: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'occupied_beds'
    },
    availableBeds: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.totalBeds - this.occupiedBeds;
      }
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    sizeSqm: {
      type: DataTypes.FLOAT,
      field: 'size_sqm'
    },
    orientation: {
      type: DataTypes.ENUM('North', 'South', 'East', 'West'),
      field: 'orientation'
    },
    hasAttachedBathroom: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'has_attached_bathroom'
    },
    hasBalcony: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'has_balcony'
    },
    monthlyRent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'monthly_rent'
    },
    semesterRent: {
      type: DataTypes.FLOAT,
      field: 'semester_rent'
    },
    annualRent: {
      type: DataTypes.FLOAT,
      field: 'annual_rent'
    },
    securityDeposit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      field: 'security_deposit'
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
    tableName: 'Rooms',
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Room.associate = (models) => {
    Room.belongsTo(models.RoomType, { 
      foreignKey: 'roomTypeId', 
      as: 'roomType'
    });
    
    Room.hasMany(models.RoomImage, { 
      foreignKey: 'roomId', 
      as: 'images'
    });
    
    // Define many-to-many with explicit through model
    Room.belongsToMany(models.Amenity, {
      through: {
        model: models.RoomAmenity,
        unique: false
      },
      foreignKey: 'roomId',
      otherKey: 'amenityId',
      as: 'amenities'
    });
    
    Room.hasMany(models.RoomAllocation, { 
      foreignKey: 'roomId', 
      as: 'allocations' 
    });
    
    Room.hasMany(models.Review, { 
      foreignKey: 'roomId', 
      as: 'reviews' 
    });
    
    Room.hasMany(models.MaintenanceRequest, { 
      foreignKey: 'roomId', 
      as: 'maintenanceRequests' 
    });
  };

  return Room;
};
