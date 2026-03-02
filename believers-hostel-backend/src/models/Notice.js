const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define('Notice', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    noticeType: {
      type: DataTypes.ENUM('GENERAL', 'URGENT', 'EVENT', 'MAINTENANCE', 'RULE_CHANGE', 'MESS'),
      defaultValue: 'GENERAL'
    },
    targetAudience: {
      type: DataTypes.ENUM('ALL', 'STUDENTS', 'STAFF', 'RESIDENTS'),
      defaultValue: 'ALL'
    },
    targetFloors: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    targetRoomTypes: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    postedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    expiryDate: {
      type: DataTypes.DATE
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    attachments: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdBy: {
      type: DataTypes.UUID
    },
    updatedBy: {
      type: DataTypes.UUID
    }
  }, {
    timestamps: true
  });

  Notice.associate = (models) => {
    Notice.belongsTo(models.User, { 
      foreignKey: 'postedBy', 
      as: 'poster' 
    });
  };

  return Notice;
};