// src/config/database.js
const { Sequelize } = require('sequelize');
const logger = require('./logger');

// Configuration object for CLI
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  }
};

// Create Sequelize instance for app
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect,
    logging: (msg) => logger.debug(msg),
    pool: config.development.pool,
    define: config.development.define
  }
);

// Export the config for CLI and the instance for the app
module.exports = sequelize;
module.exports.config = config;