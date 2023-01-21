'use strict'

const { Op } = require('sequelize')
const {v4: uuid4} = require('uuid')
const bcrypt = require('bcrypt')
const authConfig = require('../config/auth')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Users', [
        {
          id: uuid4(),
          first_name: 'juancho',
          last_name: 'panchito',
          email: 'panchito156@gmail.com',
          username: 'panchito',             
          password: 'juancho456',           // bcrypt.hashSync('juancho456', authConfig.rounds)     
          created_at: new Date(), 
          updated_at: new Date()
        }
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('Users', {
  
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}