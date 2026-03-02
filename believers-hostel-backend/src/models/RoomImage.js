const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define('RoomImage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'room_id'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url'
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      field: 'thumbnail_url'
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_primary'
    },
    caption: {
      type: DataTypes.STRING,
      field: 'caption'
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order'
    },
    fileSize: {
      type: DataTypes.INTEGER,
      field: 'file_size'
    },
    mimeType: {
      type: DataTypes.STRING,
      field: 'mime_type'
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by'
    }
  }, {
    timestamps: true,
    tableName: 'RoomImages',  // Explicitly set table name
    underscored: true,
    freezeTableName: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  RoomImage.associate = (models) => {
    RoomImage.belongsTo(models.Room, { 
      foreignKey: 'roomId', 
      as: 'room' 
    });
  };

  return RoomImage;
};
