const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'believers_hostel',
  user: 'sxnmgxr',
  password: 'sujan7410',
});

async function seedRooms() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Seeding rooms...');
    
    await client.query('BEGIN');
    
    // Get room type IDs
    const roomTypes = await client.query('SELECT id, name FROM "RoomTypes"');
    const roomTypeMap = {};
    roomTypes.rows.forEach(rt => {
      roomTypeMap[rt.name] = rt.id;
    });
    
    // Create sample rooms
    const rooms = [
      {
        roomNumber: '101',
        roomType: 'Single Room',
        floor: 1,
        block: 'A',
        totalBeds: 1,
        monthlyRent: 15000,
        semesterRent: 71250,
        annualRent: 162000,
        securityDeposit: 5000,
        hasAttachedBathroom: true,
        hasBalcony: true,
        description: 'Spacious single room with attached bathroom and balcony'
      },
      {
        roomNumber: '102',
        roomType: 'Single Room',
        floor: 1,
        block: 'A',
        totalBeds: 1,
        monthlyRent: 15000,
        semesterRent: 71250,
        annualRent: 162000,
        securityDeposit: 5000,
        hasAttachedBathroom: true,
        hasBalcony: false,
        description: 'Cozy single room with attached bathroom'
      },
      {
        roomNumber: '103',
        roomType: 'Double Room',
        floor: 1,
        block: 'A',
        totalBeds: 2,
        monthlyRent: 10000,
        semesterRent: 47500,
        annualRent: 108000,
        securityDeposit: 5000,
        hasAttachedBathroom: true,
        hasBalcony: false,
        description: 'Comfortable double room with attached bathroom'
      },
      {
        roomNumber: '104',
        roomType: 'Double Room',
        floor: 1,
        block: 'A',
        totalBeds: 2,
        monthlyRent: 10000,
        semesterRent: 47500,
        annualRent: 108000,
        securityDeposit: 5000,
        hasAttachedBathroom: true,
        hasBalcony: true,
        description: 'Double room with balcony and attached bathroom'
      },
      {
        roomNumber: '201',
        roomType: 'Triple Room',
        floor: 2,
        block: 'B',
        totalBeds: 3,
        monthlyRent: 8000,
        semesterRent: 38000,
        annualRent: 86400,
        securityDeposit: 5000,
        hasAttachedBathroom: false,
        hasBalcony: false,
        description: 'Budget-friendly triple room'
      },
      {
        roomNumber: '202',
        roomType: 'Triple Room',
        floor: 2,
        block: 'B',
        totalBeds: 3,
        monthlyRent: 8000,
        semesterRent: 38000,
        annualRent: 86400,
        securityDeposit: 5000,
        hasAttachedBathroom: false,
        hasBalcony: true,
        description: 'Triple room with balcony'
      },
      {
        roomNumber: '301',
        roomType: '4-Bed Dormitory',
        floor: 3,
        block: 'C',
        totalBeds: 4,
        monthlyRent: 6000,
        semesterRent: 28500,
        annualRent: 64800,
        securityDeposit: 3000,
        hasAttachedBathroom: false,
        hasBalcony: false,
        description: 'Dormitory with 4 beds, shared bathroom'
      },
      {
        roomNumber: '302',
        roomType: '4-Bed Dormitory',
        floor: 3,
        block: 'C',
        totalBeds: 4,
        monthlyRent: 6000,
        semesterRent: 28500,
        annualRent: 64800,
        securityDeposit: 3000,
        hasAttachedBathroom: false,
        hasBalcony: true,
        description: 'Dormitory with 4 beds and balcony'
      }
    ];

    for (const room of rooms) {
      // Check if room already exists
      const check = await client.query(
        'SELECT * FROM "Rooms" WHERE room_number = $1',
        [room.roomNumber]
      );
      
      if (check.rows.length === 0) {
        // Insert room
        await client.query(`
          INSERT INTO "Rooms" (
            id, room_number, room_type_id, floor, block, status, total_beds, occupied_beds,
            description, has_attached_bathroom, has_balcony, monthly_rent, semester_rent,
            annual_rent, security_deposit, created_at, updated_at
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, 'AVAILABLE', $5, 0,
            $6, $7, $8, $9, $10, $11, $12, NOW(), NOW()
          )
        `, [
          room.roomNumber,
          roomTypeMap[room.roomType],
          room.floor,
          room.block,
          room.totalBeds,
          room.description,
          room.hasAttachedBathroom,
          room.hasBalcony,
          room.monthlyRent,
          room.semesterRent,
          room.annualRent,
          room.securityDeposit
        ]);
        console.log(`✅ Room ${room.roomNumber} created`);
      } else {
        console.log(`⏩ Room ${room.roomNumber} already exists`);
      }
    }

    await client.query('COMMIT');
    
    // Show summary
    const roomCount = await client.query('SELECT COUNT(*) FROM "Rooms"');
    console.log(`\n📊 Total rooms: ${roomCount.rows[0].count}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seedRooms();
