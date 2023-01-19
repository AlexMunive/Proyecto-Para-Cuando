'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      States.belongsTo(models.Countries, {as: 'countries', foreignKey: 'country_id'})
      States.hasMany(models.Cities)
    }
  }
  States.init({
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID 
    },
    country_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Countries', 
        key: 'id',        
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'States',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','country_id','name']
      }
    }
  });
  return States;
};