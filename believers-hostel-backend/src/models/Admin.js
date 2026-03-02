const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: 'user_id'
    },
    employeeId: {
      type: DataTypes.STRING,
      unique: true,
      field: 'employee_id'
    },
    department: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.STRING
    },
    joiningDate: {
      type: DataTypes.DATE,
      field: 'joining_date'
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    canManageRooms: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_manage_rooms'
    },
    canManageStudents: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_manage_students'
    },
    canManagePayments: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_manage_payments'
    },
    canManageStaff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_manage_staff'
    },
    canViewReports: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_view_reports'
    },
    canManageSettings: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'can_manage_settings'
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.UUID,
      field: 'updated_by'
    }
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Admins',  // Explicitly set table name
    underscored: true,
    freezeTableName: true
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user'
    });
  };

  return Admin;
};
