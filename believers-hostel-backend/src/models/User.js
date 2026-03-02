const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'full_name'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'WARDEN', 'RECEPTIONIST', 'ACCOUNTANT', 'SECURITY', 'STUDENT'),
      defaultValue: 'STUDENT'
    },
    profileImage: {
      type: DataTypes.STRING,
      field: 'profile_image'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'email_verified'
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      field: 'email_verification_token'
    },
    emailVerificationExpires: {
      type: DataTypes.DATE,
      field: 'email_verification_expires'
    },
    lastLogin: {
      type: DataTypes.DATE,
      field: 'last_login'
    },
    refreshToken: {
      type: DataTypes.TEXT,
      field: 'refresh_token'
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      field: 'password_changed_at'
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      field: 'password_reset_token'
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      field: 'password_reset_expires'
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'two_factor_enabled'
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      field: 'two_factor_secret'
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
    tableName: 'Users',
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
          user.passwordChangedAt = new Date();
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasOne(models.Student, { 
      foreignKey: 'userId', 
      as: 'student',
      onDelete: 'CASCADE'
    });
    User.hasOne(models.Admin, { 
      foreignKey: 'userId', 
      as: 'admin',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Review, { 
      foreignKey: 'userId', 
      as: 'reviews' 
    });
    User.hasMany(models.Application, { 
      foreignKey: 'userId', 
      as: 'applications' 
    });
    User.hasMany(models.LeaveRequest, { 
      foreignKey: 'userId', 
      as: 'leaveRequests' 
    });
    User.hasMany(models.Notification, { 
      foreignKey: 'userId', 
      as: 'notifications' 
    });
    User.hasMany(models.ActivityLog, { 
      foreignKey: 'userId', 
      as: 'activities' 
    });
    User.hasMany(models.Document, { 
      foreignKey: 'uploadedBy', 
      as: 'uploadedDocuments' 
    });
  };

  // Instance methods
  User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.refreshToken;
    delete values.passwordResetToken;
    delete values.passwordResetExpires;
    delete values.twoFactorSecret;
    delete values.emailVerificationToken;
    return values;
  };

  return User;
};
