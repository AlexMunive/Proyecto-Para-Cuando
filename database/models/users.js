'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Profiles,{as: 'profiles', foreignKey: 'user_id'} )  
    }
  }
  Users.init({
    id: { 
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID 
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email:{
      type: DataTypes.STRING,
      validate: { 
        isEmail: true,
        notEmpty: true,
      }
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email_verified: {
      type: DataTypes.DATE,
    },
    token:{
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    underscored: true,  // sub-guion
    timestamps: true,   
    scopes: {
      public_view: {
        attributes: ['id','first_name','last_name','email','username']
      },
      no_timestamps: {
        attributes: {exclude: ['created_at', 'updated_at']}
      },
    }
  });
  return Users;
};