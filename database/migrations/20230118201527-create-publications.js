'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
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
      pubicationTypeId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'publication_type_id',
        foreignKey: true,
        references: {
          model: 'Publications_types', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'city_id',
        foreignKey: true,
        references: {
          model: 'Cities', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'image_url',
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
    await queryInterface.dropTable('Publications')
  }
}