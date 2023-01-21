'use strict'

const { Op } = require('sequelize')
const {v4: uuid4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('States', [
        {
          id: uuid4(),
          country_id: 'f024504f-40ff-434e-b3f8-a26ee7419ffd',
          name: 'baja california',  
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
      await queryInterface.bulkDelete('States', {
  
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}