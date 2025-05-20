const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required" },
      },
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "Lastname name is required" },
      },
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
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: { msg: "Telephone is required" },
      },
    },
    id_rol: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Rol is required" },
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: "http://localhost:3000/upload/images/users/user-avatar.png",
    },
    ImagePath: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timetamps: true,
  }
);

module.exports = User;
