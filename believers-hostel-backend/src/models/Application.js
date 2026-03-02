const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
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
    applicationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    roomTypePreference1: {
      type: DataTypes.UUID,
      references: {
        model: 'RoomTypes',
        key: 'id'
      }
    },
    roomTypePreference2: {
      type: DataTypes.UUID,
      references: {
        model: 'RoomTypes',
        key: 'id'
      }
    },
    paymentPlan: {
      type: DataTypes.ENUM('MONTHLY', 'SEMESTER', 'ANNUAL'),
      defaultValue: 'MONTHLY'
    },
    institution: {
      type: DataTypes.STRING
    },
    course: {
      type: DataTypes.STRING
    },
    yearOfStudy: {
      type: DataTypes.STRING
    },
    guardianName: {
      type: DataTypes.STRING
    },
    guardianPhone: {
      type: DataTypes.STRING
    },
    guardianEmail: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WITHDRAWN', 'WAITING_LIST'),
      defaultValue: 'SUBMITTED'
    },
    reviewedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    reviewNotes: {
      type: DataTypes.TEXT
    },
    reviewDate: {
      type: DataTypes.DATE
    },
    submittedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    expectedMoveInDate: {
      type: DataTypes.DATE
    },
    hasMealPlan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mealPlanId: {
      type: DataTypes.UUID,
      references: {
        model: 'MealPlans',
        key: 'id'
      }
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
    timestamps: true,
    paranoid: true
  });

  Application.associate = (models) => {
    Application.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'applicant' 
    });
    Application.belongsTo(models.User, { 
      foreignKey: 'reviewedBy', 
      as: 'reviewer' 
    });
    Application.belongsTo(models.RoomType, { 
      foreignKey: 'roomTypePreference1', 
      as: 'preference1' 
    });
    Application.belongsTo(models.RoomType, { 
      foreignKey: 'roomTypePreference2', 
      as: 'preference2' 
    });
    Application.belongsTo(models.MealPlan, { 
      foreignKey: 'mealPlanId', 
      as: 'mealPlan' 
    });
    Application.hasMany(models.Document, { 
      foreignKey: 'applicationId', 
      as: 'documents' 
    });
  };

  return Application;
};