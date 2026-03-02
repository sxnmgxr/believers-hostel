const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const RoomAllocation = sequelize.define('RoomAllocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    bedNumber: {
      type: DataTypes.INTEGER
    },
    allocationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    expectedCheckout: {
      type: DataTypes.DATE
    },
    actualCheckout: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'TRANSFERRED', 'CANCELLED'),
      defaultValue: 'ACTIVE'
    },
    securityDeposit: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    depositPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    depositRefunded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    depositRefundDate: {
      type: DataTypes.DATE
    },
    monthlyRent: {
      type: DataTypes.FLOAT
    },
    rentDueDay: {
      type: DataTypes.INTEGER,
      defaultValue: 5 // 5th of every month
    },
    notes: {
      type: DataTypes.TEXT
    },
    createdBy: {
      type: DataTypes.UUID
    },
    updatedBy: {
      type: DataTypes.UUID
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  RoomAllocation.associate = (models) => {
    RoomAllocation.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    RoomAllocation.belongsTo(models.Room, { 
      foreignKey: 'roomId', 
      as: 'room' 
    });
    RoomAllocation.hasMany(models.Payment, { 
      foreignKey: 'allocationId', 
      as: 'payments' 
    });
  };

  return RoomAllocation;
};