const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'believers_hostel',
  user: 'sxnmgxr',
  password: 'sujan7410',
});

async function seedRoomAmenities() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Seeding room amenities...');
    
    // Get all rooms
    const rooms = await client.query('SELECT id, room_number FROM "Rooms"');
    console.log(`Found ${rooms.rows.length} rooms`);
    
    if (rooms.rows.length === 0) {
      console.log('❌ No rooms found. Please run seed-rooms.js first');
      return;
    }
    
    // Get all amenities
    const amenities = await client.query('SELECT id, name FROM "Amenities"');
    console.log(`Found ${amenities.rows.length} amenities`);
    
    await client.query('BEGIN');
    
    let totalRelationships = 0;
    
    // Assign amenities to rooms
    for (const room of rooms.rows) {
      console.log(`\n📌 Adding amenities to room ${room.room_number}:`);
      
      // Define which amenities go to which rooms based on room type
      const roomNumber = room.room_number;
      let selectedAmenities = [];
      
      if (roomNumber.startsWith('1')) { // First floor rooms
        selectedAmenities = ['Wi-Fi', 'Study Table', 'Attached Bathroom'];
        if (roomNumber === '101' || roomNumber === '102') {
          selectedAmenities.push('Air Conditioning');
        }
        if (roomNumber === '101' || roomNumber === '104') {
          selectedAmenities.push('Power Backup');
        }
      } else if (roomNumber.startsWith('2')) { // Second floor rooms
        selectedAmenities = ['Wi-Fi', 'Study Table'];
        if (roomNumber === '202') {
          selectedAmenities.push('Attached Bathroom');
        }
      } else if (roomNumber.startsWith('3')) { // Third floor rooms
        selectedAmenities = ['Wi-Fi', 'Study Table', 'Common Room'];
        if (roomNumber === '302') {
          selectedAmenities.push('Kitchen');
        }
      }
      
      // Add common amenities to all rooms
      selectedAmenities.push('Water Supply', 'CCTV', 'Security Guard');
      
      // Remove duplicates
      selectedAmenities = [...new Set(selectedAmenities)];
      
      for (const amenityName of selectedAmenities) {
        const amenity = amenities.rows.find(a => a.name === amenityName);
        if (amenity) {
          // Check if relationship already exists
          const check = await client.query(
            'SELECT * FROM "RoomAmenities" WHERE room_id = $1 AND amenity_id = $2',
            [room.id, amenity.id]
          );
          
          if (check.rows.length === 0) {
            await client.query(
              'INSERT INTO "RoomAmenities" (room_id, amenity_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
              [room.id, amenity.id]
            );
            console.log(`  ✅ Added ${amenityName}`);
            totalRelationships++;
          } else {
            console.log(`  ⏩ ${amenityName} already exists`);
          }
        }
      }
    }
    
    await client.query('COMMIT');
    console.log(`\n🎉 Created ${totalRelationships} new room-amenity relationships`);
    
    // Show summary
    const count = await client.query('SELECT COUNT(*) FROM "RoomAmenities"');
    console.log(`📊 Total room-amenity relationships: ${count.rows[0].count}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seedRoomAmenities();
