'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable UUID extension if not exists
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // Create RoomAmenities junction table (if not exists)
    await queryInterface.createTable('RoomAmenities', {
      room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      amenity_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Amenities',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.UUID
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create Students table (if not exists)
    await queryInterface.createTable('Students', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      institution: {
        type: Sequelize.STRING
      },
      course: {
        type: Sequelize.STRING
      },
      year_of_study: {
        type: Sequelize.STRING
      },
      student_id_number: {
        type: Sequelize.STRING,
        unique: true
      },
      guardian_name: {
        type: Sequelize.STRING
      },
      guardian_phone: {
        type: Sequelize.STRING
      },
      guardian_email: {
        type: Sequelize.STRING
      },
      emergency_contact_name: {
        type: Sequelize.STRING
      },
      emergency_contact_phone: {
        type: Sequelize.STRING
      },
      emergency_contact_relation: {
        type: Sequelize.STRING
      },
      blood_group: {
        type: Sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
      },
      medical_conditions: {
        type: Sequelize.TEXT
      },
      nationality: {
        type: Sequelize.STRING,
        defaultValue: 'Nepali'
      },
      date_of_birth: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other')
      },
      permanent_address: {
        type: Sequelize.TEXT
      },
      temporary_address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING,
        defaultValue: 'Nepal'
      },
      admission_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'GRADUATED', 'LEFT'),
        defaultValue: 'ACTIVE'
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });

    // Create RoomAllocations table
    await queryInterface.createTable('RoomAllocations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      bed_number: {
        type: Sequelize.INTEGER
      },
      allocation_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      expected_checkout: {
        type: Sequelize.DATE
      },
      actual_checkout: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'COMPLETED', 'TRANSFERRED', 'CANCELLED'),
        defaultValue: 'ACTIVE'
      },
      security_deposit: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      deposit_paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deposit_refunded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      monthly_rent: {
        type: Sequelize.FLOAT
      },
      rent_due_day: {
        type: Sequelize.INTEGER,
        defaultValue: 5
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });

    // Create indexes
    await queryInterface.addIndex('RoomAmenities', ['room_id']);
    await queryInterface.addIndex('RoomAmenities', ['amenity_id']);
    await queryInterface.addIndex('Students', ['user_id']);
    await queryInterface.addIndex('Students', ['student_id_number']);
    await queryInterface.addIndex('Students', ['status']);
    await queryInterface.addIndex('RoomAllocations', ['student_id']);
    await queryInterface.addIndex('RoomAllocations', ['room_id']);
    await queryInterface.addIndex('RoomAllocations', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoomAllocations');
    await queryInterface.dropTable('Students');
    await queryInterface.dropTable('RoomAmenities');
    
    // Drop enums
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_blood_group";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_gender";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_RoomAllocations_status";');
  }
};
