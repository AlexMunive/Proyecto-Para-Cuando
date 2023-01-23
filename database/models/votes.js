'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Votes.belongsTo(models.Publications, {as: 'publications', foreignKey: 'publication_id'})
      Votes.belongsTo(models.Profiles, {as: 'profiles', foreignKey: 'profile_id'})
    }
  }
  Votes.init({

    publication_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Publications', 
        key: 'id',        
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
    profile_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Profiles', 
        key: 'id',        
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'Votes',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','publication_id','profile_id']
      }
    }
  });
  return Votes;
};