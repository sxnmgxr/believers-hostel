const bcrypt = require('bcryptjs');

const password = 'Admin@123';

async function testHash() {
  // Generate a new hash
  const newHash = await bcrypt.hash(password, 10);
  console.log('New hash for "Admin@123":', newHash);
  
  // Test against a known hash
  const knownHash = '$2a$10$XJr0Q1sY5QqZqQqZqQqZqO';
  const isValid = await bcrypt.compare(password, knownHash);
  console.log('Known hash valid?', isValid);
  
  // Test with your actual hash from database
  // Replace this with the hash from step 1
  const yourHash = '$2a$10$XJr0Q1sY5QqZqQqZqQqZqO'; // Update this with your actual hash
  const yourHashValid = await bcrypt.compare(password, yourHash);
  console.log('Your hash valid?', yourHashValid);
}

testHash();
