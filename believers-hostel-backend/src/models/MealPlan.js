const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const MealPlan = sequelize.define('MealPlan', {
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
    mealTypes: {
      type: DataTypes.JSON,
      defaultValue: ['breakfast', 'lunch', 'dinner']
    },
    monthlyCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    semesterCost: {
      type: DataTypes.FLOAT
    },
    annualCost: {
      type: DataTypes.FLOAT
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: []
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

  MealPlan.associate = (models) => {
    MealPlan.hasMany(models.StudentMealPlan, { 
      foreignKey: 'planId', 
      as: 'studentPlans' 
    });
  };

  return MealPlan;
};