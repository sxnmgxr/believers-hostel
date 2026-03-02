const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const StudentMealPlan = sequelize.define('StudentMealPlan', {
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
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'MealPlans',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'CANCELLED'),
      defaultValue: 'ACTIVE'
    },
    monthlyCost: {
      type: DataTypes.FLOAT
    },
    paymentMethod: {
      type: DataTypes.ENUM('INCLUDED_IN_RENT', 'SEPARATE')
    },
    specialRequests: {
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

  StudentMealPlan.associate = (models) => {
    StudentMealPlan.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    StudentMealPlan.belongsTo(models.MealPlan, { 
      foreignKey: 'planId', 
      as: 'plan' 
    });
  };

  return StudentMealPlan;
};