require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'sxnmgxr',
    password: process.env.DB_PASSWORD || 'sujan7410',
    database: process.env.DB_NAME || 'believers_hostel',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    migrationStorage: 'sequelize'
  },
  test: {
    username: process.env.DB_USER || 'sxnmgxr',
    password: process.env.DB_PASSWORD || 'sujan7410',
    database: process.env.DB_NAME + '_test' || 'believers_hostel_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
