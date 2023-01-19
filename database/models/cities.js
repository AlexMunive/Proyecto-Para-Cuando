'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cities.belongsTo(models.States, {as: 'states', foreignKey: 'state_id'})
      Cities.hasMany(models.Publications)
    }
  }
  Cities.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    state_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'States', 
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
    modelName: 'Cities',
    tableName: 'Cities',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','state_id','name']
      }
    },
  });
  return Cities;
};