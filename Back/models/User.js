const Sequelize = require('sequelize');
const db = require('../database/db')

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: Sequelize.STRING
    },
  
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
)