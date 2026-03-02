const { Pool } = require('pg');

// Direct database connection with hardcoded credentials
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'believers_hostel',
  user: 'sxnmgxr',
  password: 'sujan7410', // Your password
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seed...');
    console.log('📊 Connected to database:', 'believers_hostel');
    
    await client.query('BEGIN');
    
    // 1. Check if admin exists
    const adminCheck = await client.query('SELECT * FROM "Users" WHERE email = $1', ['admin@believershostel.com']);
    
    if (adminCheck.rows.length === 0) {
      // Insert admin user (password: Admin@123 hashed)
      await client.query(`
        INSERT INTO "Users" (id, email, password, full_name, phone, role, email_verified, created_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, true, NOW(), NOW())
      `, [
        'admin@believershostel.com',
        '$2a$10$XJr0Q1sY5QqZqQqZqQqZqO', // This is "Admin@123" hashed
        'Super Admin',
        '9800000000',
        'SUPER_ADMIN'
      ]);
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    // 2. Insert room types
    const roomTypes = [
      ['Single Room', 'Private room for one person with attached bathroom', 1, 15000, 5, 10],
      ['Double Room', 'Shared room for two persons with attached bathroom', 2, 10000, 5, 10],
      ['Triple Room', 'Shared room for three persons', 3, 8000, 5, 10],
      ['4-Bed Dormitory', 'Dormitory with 4 beds and common bathroom', 4, 6000, 5, 10]
    ];
    
    for (const rt of roomTypes) {
      const check = await client.query('SELECT * FROM "RoomTypes" WHERE name = $1', [rt[0]]);
      if (check.rows.length === 0) {
        await client.query(`
          INSERT INTO "RoomTypes" (id, name, description, capacity, base_price, semester_discount, annual_discount, is_active, created_at, updated_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, true, NOW(), NOW())
        `, rt);
        console.log(`✅ Room type created: ${rt[0]}`);
      }
    }
    
    // 3. Insert amenities
    const amenities = [
      ['Wi-Fi', 'High-speed internet', 'utility', 'wifi'],
      ['Air Conditioning', 'Temperature controlled', 'room', 'ac'],
      ['Study Table', 'Personal study desk', 'room', 'desk'],
      ['Attached Bathroom', 'Private bathroom', 'room', 'bath'],
      ['Common Room', 'TV and seating area', 'common', 'tv'],
      ['Kitchen', 'Shared kitchen with appliances', 'common', 'kitchen'],
      ['Laundry', 'Washing machine available', 'service', 'wash'],
      ['CCTV', '24/7 surveillance', 'security', 'camera'],
      ['Security Guard', '24/7 security personnel', 'security', 'security'],
      ['Parking', 'Vehicle parking available', 'service', 'parking'],
      ['Power Backup', 'Generator backup', 'utility', 'power'],
      ['Water Supply', '24/7 water supply', 'utility', 'water']
    ];
    
    for (const amenity of amenities) {
      const check = await client.query('SELECT * FROM "Amenities" WHERE name = $1', [amenity[0]]);
      if (check.rows.length === 0) {
        await client.query(`
          INSERT INTO "Amenities" (id, name, description, category, icon, is_active, created_at, updated_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW())
        `, amenity);
        console.log(`✅ Amenity created: ${amenity[0]}`);
      }
    }
    
    // 4. Insert settings
    const settings = [
      ['hostel_name', 'Believers Hostel', 'text', 'general', 'Name of the hostel', true],
      ['contact_email', 'info@believershostel.com', 'text', 'contact', 'Primary contact email', true],
      ['contact_phone', '+977-1-2345678', 'text', 'contact', 'Primary contact phone', true],
      ['address', 'Kathmandu, Nepal', 'text', 'contact', 'Hostel address', true],
      ['check_in_time', '12:00 PM', 'text', 'rules', 'Default check-in time', true],
      ['check_out_time', '11:00 AM', 'text', 'rules', 'Default check-out time', true],
      ['security_deposit', '5000', 'number', 'payments', 'Standard security deposit amount', true],
      ['late_fee_percentage', '2', 'number', 'payments', 'Late fee percentage per month', false],
      ['curfew_time', '10:00 PM', 'text', 'rules', 'Hostel curfew time', true],
      ['max_guests_allowed', '2', 'number', 'rules', 'Maximum guests allowed per student', true]
    ];
    
    for (const setting of settings) {
      const check = await client.query('SELECT * FROM "Settings" WHERE key = $1', [setting[0]]);
      if (check.rows.length === 0) {
        await client.query(`
          INSERT INTO "Settings" (id, key, value, type, category, description, is_public, created_at, updated_at)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
        `, setting);
        console.log(`✅ Setting created: ${setting[0]}`);
      }
    }
    
    await client.query('COMMIT');
    
    // Show summary
    const userCount = await client.query('SELECT COUNT(*) FROM "Users"');
    const roomTypeCount = await client.query('SELECT COUNT(*) FROM "RoomTypes"');
    const amenityCount = await client.query('SELECT COUNT(*) FROM "Amenities"');
    const settingCount = await client.query('SELECT COUNT(*) FROM "Settings"');
    
    console.log('\n📊 SEED SUMMARY:');
    console.log('=================================');
    console.log(`Users:      ${userCount.rows[0].count}`);
    console.log(`Room Types: ${roomTypeCount.rows[0].count}`);
    console.log(`Amenities:  ${amenityCount.rows[0].count}`);
    console.log(`Settings:   ${settingCount.rows[0].count}`);
    console.log('=================================');
    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
