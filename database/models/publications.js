'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications.belongsTo(models.Profiles, {as: 'profiles', foreignKey: 'profile_id'})
      Publications.belongsTo(models.Publications_types, {as: 'publications_types', foreignKey: 'publication_type_id'})
      Publications.belongsTo(models.Cities, {as: 'cities', foreignKey: 'city_id'})
      Publications.belongsToMany(models.Votes, {as: 'votes', through: models.Votes, foreignKey: 'profile_id'})
    }
  }
  Publications.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
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
    },
    publication_type_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Publications_types', 
        key: 'id',        
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
    city_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Cities', 
        key: 'id',        
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    picture: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'Publications',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','profile_id','publication_type_id','city_id','title','description','content','picture','image_url']
      }
    },
  });
  return Publications;
};