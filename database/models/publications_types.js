'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications_types.hasMany(models.Publications, {as: 'publications', foreignKey: 'publication_type_id'})
    }
  }
  Publications_types.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'Publications_types',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','name','description']
      }
    },

  });
  return Publications_types;
};