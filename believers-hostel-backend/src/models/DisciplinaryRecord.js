const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const DisciplinaryRecord = sequelize.define('DisciplinaryRecord', {
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
    incidentType: {
      type: DataTypes.ENUM('LATE_ENTRY', 'RULE_VIOLATION', 'DAMAGE', 'DISTURBANCE', 'UNAUTHORIZED_VISITOR', 'OTHER'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    actionTaken: {
      type: DataTypes.TEXT
    },
    fineAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    warningLevel: {
      type: DataTypes.ENUM('FIRST', 'SECOND', 'FINAL'),
      defaultValue: 'FIRST'
    },
    recordedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    incidentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resolvedAt: {
      type: DataTypes.DATE
    },
    resolvedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
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
    timestamps: true
  });

  DisciplinaryRecord.associate = (models) => {
    DisciplinaryRecord.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    DisciplinaryRecord.belongsTo(models.User, { 
      foreignKey: 'recordedBy', 
      as: 'recorder' 
    });
    DisciplinaryRecord.belongsTo(models.User, { 
      foreignKey: 'resolvedBy', 
      as: 'resolver' 
    });
  };

  return DisciplinaryRecord;
};