const { Sequelize, DataTypes } = require('sequelize')
const personSchema = require('./person')
const itemSchema = require('./item')

const DATABASE_URL = process.env.DATABASE_URL || `sqlite::memory`

const sequelize = new Sequelize(DATABASE_URL)

const person = personSchema(sequelize, DataTypes)
const item = itemSchema(sequelize, DataTypes)

module.exports = { sequelize, person, item }