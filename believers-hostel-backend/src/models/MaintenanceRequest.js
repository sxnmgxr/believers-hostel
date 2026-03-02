const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const MaintenanceRequest = sequelize.define('MaintenanceRequest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.UUID,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    requestNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    issueType: {
      type: DataTypes.ENUM('ELECTRICAL', 'PLUMBING', 'FURNITURE', 'APPLIANCE', 'CLEANING', 'PEST_CONTROL', 'OTHER'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
      defaultValue: 'MEDIUM'
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    assignedTo: {
      type: DataTypes.STRING
    },
    assignedAt: {
      type: DataTypes.DATE
    },
    estimatedCost: {
      type: DataTypes.FLOAT
    },
    actualCost: {
      type: DataTypes.FLOAT
    },
    chargedToStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completedAt: {
      type: DataTypes.DATE
    },
    completionNotes: {
      type: DataTypes.TEXT
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

  MaintenanceRequest.associate = (models) => {
    MaintenanceRequest.belongsTo(models.Room, { 
      foreignKey: 'roomId', 
      as: 'room' 
    });
    MaintenanceRequest.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
  };

  return MaintenanceRequest;
};