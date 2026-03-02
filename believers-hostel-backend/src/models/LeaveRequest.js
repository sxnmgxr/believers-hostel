const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define('LeaveRequest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    leaveType: {
      type: DataTypes.ENUM('DAY_OUT', 'NIGHT_OUT', 'WEEKEND', 'EMERGENCY', 'VACATION'),
      allowNull: false
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fromTime: {
      type: DataTypes.TIME
    },
    toTime: {
      type: DataTypes.TIME
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING
    },
    emergencyContact: {
      type: DataTypes.STRING
    },
    emergencyPhone: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED'),
      defaultValue: 'PENDING'
    },
    approvedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    approvalNotes: {
      type: DataTypes.TEXT
    },
    approvedAt: {
      type: DataTypes.DATE
    },
    checkOutTime: {
      type: DataTypes.DATE
    },
    checkInTime: {
      type: DataTypes.DATE
    },
    isLate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lateMinutes: {
      type: DataTypes.INTEGER
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

  LeaveRequest.associate = (models) => {
    LeaveRequest.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user' 
    });
    LeaveRequest.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    LeaveRequest.belongsTo(models.User, { 
      foreignKey: 'approvedBy', 
      as: 'approver' 
    });
  };

  return LeaveRequest;
};