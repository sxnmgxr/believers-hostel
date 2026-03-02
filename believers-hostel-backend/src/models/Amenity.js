const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    icon: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.ENUM('room', 'common', 'service', 'security', 'utility'),
      defaultValue: 'room'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
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
    tableName: 'Amenities',
    underscored: true,
    freezeTableName: true
  });

  Amenity.associate = (models) => {
    Amenity.belongsToMany(models.Room, {
      through: {
        model: models.RoomAmenity,
        unique: false
      },
      foreignKey: 'amenityId',
      otherKey: 'roomId',
      as: 'rooms'
    });
  };

  return Amenity;
};
