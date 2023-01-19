'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      publicationId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'publication_id',
        foreignKey: true,
        references: {
          model: 'Publications', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      profileId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'profile_id',
        foreignKey: true,
        references: {
          model: 'Profiles', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
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
    await queryInterface.dropTable('Votes')
  }
}