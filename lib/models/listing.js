'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Listing extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: "authorId"
            });
        }
    }
    Listing.init({
        //name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        address: DataTypes.STRING,
        price: DataTypes.FLOAT,
        numOfBeds: { type: DataTypes.INTEGER, defaultValue: 0 },
        numOfBaths: { type: DataTypes.INTEGER, defaultValue: 0 },
        rating: DataTypes.FLOAT,
        authorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Listing',
    });
    return Listing;
};
