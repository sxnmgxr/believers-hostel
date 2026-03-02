require('dotenv').config();
const { sequelize, User, Student, Admin, RoomType, Amenity, Setting } = require('../src/models');
const bcrypt = require('bcryptjs');
const logger = require('../src/config/logger');

async function seed() {
  try {
    logger.info('🌱 Seeding database...');

    // Test database connection first
    await sequelize.authenticate();
    logger.info('✅ Database connection successful');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const [adminUser, created] = await User.findOrCreate({
      where: { email: 'admin@believershostel.com' },
      defaults: {
        email: 'admin@believershostel.com',
        password: hashedPassword,
        fullName: 'Super Admin',
        phone: '9800000000',
        role: 'SUPER_ADMIN',
        emailVerified: true
      }
    });

    if (created) {
      logger.info('✅ Admin user created');
      
      await Admin.findOrCreate({
        where: { userId: adminUser.id },
        defaults: {
          userId: adminUser.id,
          employeeId: 'EMP001',
          department: 'Management',
          designation: 'Super Admin',
          joiningDate: new Date(),
          canManageRooms: true,
          canManageStudents: true,
          canManagePayments: true,
          canManageStaff: true,
          canViewReports: true,
          canManageSettings: true
        }
      });
    } else {
      logger.info('✅ Admin user already exists');
    }

    // Create room types
    const roomTypesData = [
      {
        name: 'Single Room',
        description: 'Private room for one person with attached bathroom',
        capacity: 1,
        basePrice: 15000,
        semesterDiscount: 5,
        annualDiscount: 10
      },
      {
        name: 'Double Room',
        description: 'Shared room for two persons with attached bathroom',
        capacity: 2,
        basePrice: 10000,
        semesterDiscount: 5,
        annualDiscount: 10
      },
      {
        name: 'Triple Room',
        description: 'Shared room for three persons',
        capacity: 3,
        basePrice: 8000,
        semesterDiscount: 5,
        annualDiscount: 10
      },
      {
        name: '4-Bed Dormitory',
        description: 'Dormitory with 4 beds and common bathroom',
        capacity: 4,
        basePrice: 6000,
        semesterDiscount: 5,
        annualDiscount: 10
      }
    ];

    for (const rt of roomTypesData) {
      await RoomType.findOrCreate({
        where: { name: rt.name },
        defaults: rt
      });
    }
    logger.info('✅ Room types created/verified');

    // Create amenities
    const amenitiesData = [
      { name: 'Wi-Fi', description: 'High-speed internet', category: 'utility', icon: 'wifi' },
      { name: 'Air Conditioning', description: 'Temperature controlled', category: 'room', icon: 'ac' },
      { name: 'Study Table', description: 'Personal study desk', category: 'room', icon: 'desk' },
      { name: 'Attached Bathroom', description: 'Private bathroom', category: 'room', icon: 'bath' },
      { name: 'Common Room', description: 'TV and seating area', category: 'common', icon: 'tv' },
      { name: 'Kitchen', description: 'Shared kitchen with appliances', category: 'common', icon: 'kitchen' },
      { name: 'Laundry', description: 'Washing machine available', category: 'service', icon: 'wash' },
      { name: 'CCTV', description: '24/7 surveillance', category: 'security', icon: 'camera' },
      { name: 'Security Guard', description: '24/7 security personnel', category: 'security', icon: 'security' },
      { name: 'Parking', description: 'Vehicle parking available', category: 'service', icon: 'parking' },
      { name: 'Power Backup', description: 'Generator backup', category: 'utility', icon: 'power' },
      { name: 'Water Supply', description: '24/7 water supply', category: 'utility', icon: 'water' }
    ];

    for (const amenity of amenitiesData) {
      await Amenity.findOrCreate({
        where: { name: amenity.name },
        defaults: amenity
      });
    }
    logger.info('✅ Amenities created/verified');

    // Create settings
    const settingsData = [
      {
        key: 'hostel_name',
        value: 'Believers Hostel',
        type: 'text',
        category: 'general',
        description: 'Name of the hostel',
        isPublic: true
      },
      {
        key: 'contact_email',
        value: 'info@believershostel.com',
        type: 'text',
        category: 'contact',
        description: 'Primary contact email',
        isPublic: true
      },
      {
        key: 'contact_phone',
        value: '+977-1-2345678',
        type: 'text',
        category: 'contact',
        description: 'Primary contact phone',
        isPublic: true
      },
      {
        key: 'address',
        value: 'Kathmandu, Nepal',
        type: 'text',
        category: 'contact',
        description: 'Hostel address',
        isPublic: true
      },
      {
        key: 'check_in_time',
        value: '12:00 PM',
        type: 'text',
        category: 'rules',
        description: 'Default check-in time',
        isPublic: true
      },
      {
        key: 'check_out_time',
        value: '11:00 AM',
        type: 'text',
        category: 'rules',
        description: 'Default check-out time',
        isPublic: true
      },
      {
        key: 'late_fee_percentage',
        value: '2',
        type: 'number',
        category: 'payments',
        description: 'Late fee percentage per month',
        isPublic: false
      },
      {
        key: 'security_deposit',
        value: '5000',
        type: 'number',
        category: 'payments',
        description: 'Standard security deposit amount',
        isPublic: true
      },
      {
        key: 'curfew_time',
        value: '10:00 PM',
        type: 'text',
        category: 'rules',
        description: 'Hostel curfew time',
        isPublic: true
      },
      {
        key: 'max_guests_allowed',
        value: '2',
        type: 'number',
        category: 'rules',
        description: 'Maximum guests allowed per student',
        isPublic: true
      }
    ];

    for (const setting of settingsData) {
      await Setting.findOrCreate({
        where: { key: setting.key },
        defaults: setting
      });
    }
    logger.info('✅ Settings created/verified');

    logger.info('✅ Seed completed successfully');
  } catch (error) {
    logger.error('❌ Seed failed:', error);
    console.error('Detailed error:', error);
  } finally {
    await sequelize.close();
  }
}

seed();
