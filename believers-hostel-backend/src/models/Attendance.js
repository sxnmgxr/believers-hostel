const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    checkIn: {
      type: DataTypes.DATE
    },
    checkOut: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('PRESENT', 'ABSENT', 'LATE', 'LEAVE', 'HOLIDAY'),
      defaultValue: 'PRESENT'
    },
    lateMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    notes: {
      type: DataTypes.TEXT
    },
    recordedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.UUID
    },
    updatedBy: {
      type: DataTypes.UUID
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'date']
      }
    ]
  });

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    Attendance.belongsTo(models.User, { 
      foreignKey: 'recordedBy', 
      as: 'recorder' 
    });
  };

  return Attendance;
};