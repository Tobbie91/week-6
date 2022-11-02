'use strict';
import {DataTypes, INTEGER, Model} from 'sequelize';
export = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: "authorId"
      })
    }
  }
  Listing.init({
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.FLOAT,
    numOfBeds: DataTypes.INTEGER,
    numOfBaths: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    id: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};