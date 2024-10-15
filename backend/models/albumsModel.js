const { Sequelize, DataTypes, INTEGER } = require("sequelize");

const sequelize = require("../config/database");

const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const PICTURES = require("./picturesModel");

const ALBUMS = sequelize.define("ALBUMS", {
  albumId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    allowNull: false,
  },
  albumName: {
    type: DataTypes.STRING
  },
});
ALBUMS.hasMany(PICTURES, {foreignKey: "albumId", onDelete: "CASCADE"});
module.exports = ALBUMS;