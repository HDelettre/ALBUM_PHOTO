const { Sequelize, DataTypes, INTEGER } = require("sequelize");

const sequelize = require("../config/database");

const PICTURES = sequelize.define("PICTURES", {
  pictureId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  albumId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
});

module.exports = PICTURES;