'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable UUID extension if not exists
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // Create Users table
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('SUPER_ADMIN', 'ADMIN', 'WARDEN', 'RECEPTIONIST', 'ACCOUNTANT', 'SECURITY', 'STUDENT'),
        defaultValue: 'STUDENT'
      },
      profile_image: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      email_verification_token: {
        type: Sequelize.STRING
      },
      email_verification_expires: {
        type: Sequelize.DATE
      },
      last_login: {
        type: Sequelize.DATE
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      password_changed_at: {
        type: Sequelize.DATE
      },
      password_reset_token: {
        type: Sequelize.STRING
      },
      password_reset_expires: {
        type: Sequelize.DATE
      },
      two_factor_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      two_factor_secret: {
        type: Sequelize.STRING
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

    // Create Students table
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

    // Create Admins table
    await queryInterface.createTable('Admins', {
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
      employee_id: {
        type: Sequelize.STRING,
        unique: true
      },
      department: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      joining_date: {
        type: Sequelize.DATE
      },
      permissions: {
        type: Sequelize.JSON,
        defaultValue: []
      },
      can_manage_rooms: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_manage_students: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_manage_payments: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_manage_staff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_view_reports: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      can_manage_settings: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    // Create RoomTypes table
    await queryInterface.createTable('RoomTypes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      base_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      semester_discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      annual_discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      features: {
        type: Sequelize.JSON,
        defaultValue: []
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

    // Create Amenities table
    await queryInterface.createTable('Amenities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      icon: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.ENUM('room', 'common', 'service', 'security', 'utility'),
        defaultValue: 'room'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

    // Create Settings table
    await queryInterface.createTable('Settings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('text', 'number', 'boolean', 'json', 'array'),
        defaultValue: 'text'
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'general'
      },
      description: {
        type: Sequelize.TEXT
      },
      is_public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Settings');
    await queryInterface.dropTable('Amenities');
    await queryInterface.dropTable('RoomTypes');
    await queryInterface.dropTable('Admins');
    await queryInterface.dropTable('Students');
    await queryInterface.dropTable('Users');
    
    // Drop enums
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_blood_group";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_gender";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Students_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Amenities_category";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Settings_type";');
  }
};
