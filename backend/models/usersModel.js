const { Sequelize, DataTypes, INTEGER } = require("sequelize");

const sequelize = require("../config/database");

const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const ALBUMS = require("./albumsModel");

const USERS = sequelize.define("USERS", {
  userId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "defaultUserAvatar.png"
  },
});

USERS.hasMany(ALBUMS, {foreignKey: "userId", onDelete: "CASCADE"});
module.exports = USERS;