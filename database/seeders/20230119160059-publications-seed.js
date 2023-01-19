'use strict'

const { Op } = require('sequelize')
const {v4: uuid4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Publications', [
        {
          id: uuid4(),
          profile_id: '676b6dce-da3d-4e1b-9653-f74df0d66fea',
          publication_type_id: '1060c6fb-0404-49de-85b1-68b242760047',
          city_id: '322acd99-c327-4659-bfe8-8c9dc0e8e166',
          title: 'Debate por ayuda al ex-presidente de Perú',
          description: 'El canciller mexicano, Marcelo Ebrard, señaló que su país recibió una petición de protección en la madrugada 8 de diciembre del 2022 ',
          content: 'En una conferencia de prensa, el presidente de México informó que recibió una llamada de Castillo el miércoles en la que le informó que se trasladaría a la embajada de México en Lima para pedir asilo.',
          picture: 'https://mf.b37mrtl.ru/actualidad/public_images/2022.12/article/639332a4e9ff71419e000a65.jpg',
          image_url: 'https://ichef.bbci.co.uk/news/800/cpsprodpb/7191/production/_127937092_f06a6e34-f284-4d0a-b067-d1eaafd8cc38.jpg',
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
      await queryInterface.bulkDelete('Publications', {
  
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}