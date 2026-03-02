const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
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
    institution: {
      type: DataTypes.STRING
    },
    course: {
      type: DataTypes.STRING
    },
    yearOfStudy: {
      type: DataTypes.STRING,
      field: 'year_of_study'
    },
    studentIdNumber: {
      type: DataTypes.STRING,
      unique: true,
      field: 'student_id_number'
    },
    guardianName: {
      type: DataTypes.STRING,
      field: 'guardian_name'
    },
    guardianPhone: {
      type: DataTypes.STRING,
      field: 'guardian_phone'
    },
    guardianEmail: {
      type: DataTypes.STRING,
      field: 'guardian_email'
    },
    emergencyContactName: {
      type: DataTypes.STRING,
      field: 'emergency_contact_name'
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
      field: 'emergency_contact_phone'
    },
    emergencyContactRelation: {
      type: DataTypes.STRING,
      field: 'emergency_contact_relation'
    },
    bloodGroup: {
      type: DataTypes.STRING,
      field: 'blood_group'
    },
    medicalConditions: {
      type: DataTypes.TEXT,
      field: 'medical_conditions'
    },
    nationality: {
      type: DataTypes.STRING,
      defaultValue: 'Nepali'
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      field: 'date_of_birth'
    },
    gender: {
      type: DataTypes.STRING
    },
    permanentAddress: {
      type: DataTypes.TEXT,
      field: 'permanent_address'
    },
    temporaryAddress: {
      type: DataTypes.TEXT,
      field: 'temporary_address'
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zipCode: {
      type: DataTypes.STRING,
      field: 'zip_code'
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: 'Nepal'
    },
    admissionDate: {
      type: DataTypes.DATE,
      field: 'admission_date'
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'GRADUATED', 'LEFT'),
      defaultValue: 'ACTIVE'
    },
    notes: {
      type: DataTypes.TEXT
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
    tableName: 'Students',
    underscored: true,
    freezeTableName: true
  });

  Student.associate = (models) => {
    Student.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user',
      targetKey: 'id'
    });
    Student.hasMany(models.RoomAllocation, { 
      foreignKey: 'studentId', 
      as: 'allocations' 
    });
    Student.hasMany(models.Payment, { 
      foreignKey: 'studentId', 
      as: 'payments' 
    });
    Student.hasMany(models.Attendance, { 
      foreignKey: 'studentId', 
      as: 'attendance' 
    });
    Student.hasMany(models.LeaveRequest, { 
      foreignKey: 'studentId', 
      as: 'leaveRequests' 
    });
    Student.hasMany(models.DisciplinaryRecord, { 
      foreignKey: 'studentId', 
      as: 'disciplinaryRecords' 
    });
    Student.hasMany(models.MaintenanceRequest, { 
      foreignKey: 'studentId', 
      as: 'maintenanceRequests' 
    });
    Student.hasMany(models.StudentMealPlan, { 
      foreignKey: 'studentId', 
      as: 'mealPlans' 
    });
    Student.hasMany(models.Document, { 
      foreignKey: 'studentId', 
      as: 'documents' 
    });
  };

  return Student;
};
