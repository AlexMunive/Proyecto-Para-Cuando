'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.Users, {as: 'users', foreignKey: 'user_id'})
      Profiles.belongsTo(models.Roles, {as: 'roles', foreignKey: 'role_id'})
      Profiles.belongsTo(models.Countries, {as: 'countries', foreignKey: 'country_id'})
      Profiles.belongsToMany(models.Publications, {as: 'votes', through: models.Votes})
    }
  }
  Profiles.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
    },
    role_id: {
      type: DataTypes.UUID,
      field: 'role_id',
      foreignKey: true,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE' 
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
    image_url: {
      type: DataTypes.STRING,
    },
    code_phone: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'Profiles',
    underscored: true,  
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id','user_id','role_id','country_id','image_url','code_phone','phone']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      }
    }
  });
  return Profiles;
};