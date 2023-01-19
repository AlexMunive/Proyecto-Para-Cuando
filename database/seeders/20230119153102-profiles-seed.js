'use strict'

const { Op } = require('sequelize')
const {v4: uuid4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Profiles', [
        {
          id: uuid4(),
          user_id: 'af72eba9-f457-4a08-8504-3e94e5fb675d', 
          role_id: '5c7ee50a-3df4-495c-ab68-33010e329447', 
          country_id: 'b5e37df4-931a-49b8-b9dd-1d8d6f29e354',
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Pedro_Castillo_portrait.png',
          code_phone: '+51',
          phone: '948531255',
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
      await queryInterface.bulkDelete('Profiles', {
  
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}