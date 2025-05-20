const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const auth = sequelize.define(
  auth,
  {
    id: {
      type: DataTypes.UUID,
      primarykey: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email is valid" },
        notNull: { msg: "Email is required" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
      },
    },
  },
  {
    timetamps: true,
  }
);

module.exports = auth;
