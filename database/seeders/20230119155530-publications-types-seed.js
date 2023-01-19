'use strict'

const { Op } = require('sequelize')
const {v4: uuid4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Publications_types', [
        {
          id: uuid4(),
          name: 'evento',  
          description: 'Aviso de ultimo minuto, el estado de Mexico ayuda a esposa e hijos del ex-presidente de Perú',
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
      await queryInterface.bulkDelete('Publications_types', {
        name: {
          [Op.or]: ['evento','concierto','torneo']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}