'use strict';
import {DataTypes, Model} from 'sequelize';
export (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  
    static associate(models) {
      // define association here
      this.hasMany(models.listing,{
      foreignKey: "authorId",
      })
    }
  
  }

  User.init({
    fullname: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false},
    phoneNumber: { type:DataTypes.STRING, unique:true, allowNull:false},
    password: DataTypes.STRING,
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};
//export class User