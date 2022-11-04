'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: "authorId"
      })
    }
  }

  Listing.init({
    //name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.FLOAT,
    numOfBeds: {type:DataTypes.INTEGER, defaultValue: 0},
    numOfBaths: {type:DataTypes.INTEGER, defaultValue: 0},
    rating: DataTypes.FLOAT,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};