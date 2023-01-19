'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Countries.hasMany(models.Profiles)
      Countries.hasMany(models.States)
    }
  }
  Countries.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID 
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'Countries',
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
  return Countries;
};