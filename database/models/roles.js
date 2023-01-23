'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.Profiles, {as: 'profiles', foreignKey: 'role_id'})  
    }
  }
  Roles.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'Roles',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','name']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      },
    },

  });
  return Roles;
};