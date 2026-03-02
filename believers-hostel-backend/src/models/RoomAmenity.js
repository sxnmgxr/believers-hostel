module.exports = (sequelize, DataTypes) => {
  const RoomAmenity = sequelize.define('RoomAmenity', {
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'room_id',
      primaryKey: true
    },
    amenityId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'amenity_id',
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    notes: {
      type: DataTypes.TEXT
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by'
    }
  }, {
    timestamps: true,
    tableName: 'RoomAmenities',
    underscored: true,
    freezeTableName: true,
    paranoid: false  // Disable paranoid (soft delete) for this table
  });

  RoomAmenity.associate = (models) => {
    RoomAmenity.belongsTo(models.Room, { 
      foreignKey: 'roomId', 
      as: 'room'
    });
    RoomAmenity.belongsTo(models.Amenity, { 
      foreignKey: 'amenityId', 
      as: 'amenity'
    });
  };

  return RoomAmenity;
};
