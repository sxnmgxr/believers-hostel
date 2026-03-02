'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Rooms table
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      room_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      room_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'RoomTypes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      floor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      block: {
        type: Sequelize.STRING,
        defaultValue: 'A'
      },
      status: {
        type: Sequelize.ENUM('AVAILABLE', 'OCCUPIED', 'PARTIALLY_OCCUPIED', 'MAINTENANCE', 'RESERVED'),
        defaultValue: 'AVAILABLE'
      },
      total_beds: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      occupied_beds: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT
      },
      size_sqm: {
        type: Sequelize.FLOAT
      },
      orientation: {
        type: Sequelize.ENUM('North', 'South', 'East', 'West')
      },
      has_attached_bathroom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      has_balcony: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      monthly_rent: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      semester_rent: {
        type: Sequelize.FLOAT
      },
      annual_rent: {
        type: Sequelize.FLOAT
      },
      security_deposit: {
        type: Sequelize.FLOAT,
        defaultValue: 0
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

    // Create RoomImages table
    await queryInterface.createTable('RoomImages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
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
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thumbnail_url: {
        type: Sequelize.STRING
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      caption: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      file_size: {
        type: Sequelize.INTEGER
      },
      mime_type: {
        type: Sequelize.STRING
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

    // Create RoomAmenities junction table
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

    // Create indexes
    await queryInterface.addIndex('Rooms', ['room_number']);
    await queryInterface.addIndex('Rooms', ['status']);
    await queryInterface.addIndex('Rooms', ['room_type_id']);
    await queryInterface.addIndex('RoomImages', ['room_id']);
    await queryInterface.addIndex('RoomAmenities', ['room_id']);
    await queryInterface.addIndex('RoomAmenities', ['amenity_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoomAmenities');
    await queryInterface.dropTable('RoomImages');
    await queryInterface.dropTable('Rooms');
    
    // Drop enums
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Rooms_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Rooms_orientation";');
  }
};
