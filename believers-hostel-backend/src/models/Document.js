const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      references: {
        model: 'Students',
        key: 'id'
      }
    },
    applicationId: {
      type: DataTypes.UUID,
      references: {
        model: 'Applications',
        key: 'id'
      }
    },
    documentType: {
      type: DataTypes.ENUM('ID_CARD', 'STUDENT_ID', 'PHOTO', 'ADMISSION_LETTER', 'GUARDIAN_ID', 'PAYMENT_RECEIPT', 'OTHER'),
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING
    },
    fileSize: {
      type: DataTypes.INTEGER
    },
    mimeType: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifiedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    verifiedAt: {
      type: DataTypes.DATE
    },
    notes: {
      type: DataTypes.TEXT
    },
    uploadedBy: {
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
    timestamps: true
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    Document.belongsTo(models.Application, { 
      foreignKey: 'applicationId', 
      as: 'application' 
    });
    Document.belongsTo(models.User, { 
      foreignKey: 'verifiedBy', 
      as: 'verifier' 
    });
    Document.belongsTo(models.User, { 
      foreignKey: 'uploadedBy', 
      as: 'uploader' 
    });
  };

  return Document;
};