'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'user_id',
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'role_id',
        foreignKey: true,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: false, 
        field: 'country_id',
        foreignKey: true,
        references: {
          model: 'Countries', 
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'image_url',
      },
      codePhone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'code_phone',
      },
      phone: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Profiles')
  }
}