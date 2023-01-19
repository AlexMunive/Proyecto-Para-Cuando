'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      stateId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'state_id',
        foreignKey: true,
        references: {
          model: 'States', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cities')
  }
}