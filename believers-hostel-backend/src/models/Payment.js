const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
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
    allocationId: {
      type: DataTypes.UUID,
      references: {
        model: 'RoomAllocations',
        key: 'id'
      }
    },
    paymentType: {
      type: DataTypes.ENUM('RENT', 'MESS', 'SECURITY_DEPOSIT', 'ADMISSION_FEE', 'LAUNDRY', 'FINE', 'MISCELLANEOUS'),
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    lateFee: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    totalAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.amount - this.discount + this.lateFee;
      }
    },
    paymentMethod: {
      type: DataTypes.ENUM('CASH', 'CARD', 'WALLET', 'BANK_TRANSFER', 'CHEQUE', 'ONLINE'),
      allowNull: false
    },
    paymentStatus: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true
    },
    paymentGateway: {
      type: DataTypes.STRING
    },
    gatewayResponse: {
      type: DataTypes.JSON
    },
    forMonth: {
      type: DataTypes.DATE
    },
    dueDate: {
      type: DataTypes.DATE
    },
    paidDate: {
      type: DataTypes.DATE
    },
    receiptNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    notes: {
      type: DataTypes.TEXT
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
    createdBy: {
      type: DataTypes.UUID
    },
    updatedBy: {
      type: DataTypes.UUID
    }
  }, {
    timestamps: true
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Student, { 
      foreignKey: 'studentId', 
      as: 'student' 
    });
    Payment.belongsTo(models.RoomAllocation, { 
      foreignKey: 'allocationId', 
      as: 'allocation' 
    });
    Payment.belongsTo(models.User, { 
      foreignKey: 'verifiedBy', 
      as: 'verifier' 
    });
  };

  return Payment;
};