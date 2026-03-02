const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entityType: {
      type: DataTypes.STRING
    },
    entityId: {
      type: DataTypes.UUID
    },
    oldValues: {
      type: DataTypes.JSON
    },
    newValues: {
      type: DataTypes.JSON
    },
    ipAddress: {
      type: DataTypes.STRING
    },
    userAgent: {
      type: DataTypes.TEXT
    },
    device: {
      type: DataTypes.STRING
    },
    browser: {
      type: DataTypes.STRING
    },
    os: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.JSON
    },
    status: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER // in milliseconds
    },
    createdBy: {
      type: DataTypes.UUID
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['action']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user' 
    });
  };

  return ActivityLog;
};