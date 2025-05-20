const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require ("./user.model")

const rol = sequelize.define(
  "rol",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },
  },
  {
    timetamps: true,
  }
);

rol.hasMany(User,{
    foreignKey: "id_rol",
    sourceKey: "id",
});

User.belongsTo(rol,{
    foreignKey: "id_rol",
    targetKey:"id"
});

module.exports = rol;
