const User = require("../models/user.model");
const Rol = require("../models/role.model");
const response = require("../res/response");
const Auth = require("../models/auth.model");
const bycrypt = require("bcrypt");
const fs = require("fs");

const getAll = async (req, res, next) => {
  try {
    const user = await User.findAll({ include: [{ model: Rol, as: "Role" }] });
    let data = "";
    if (user.length === 0) {
      data = {
        total_registered: user.length,
        data: user,
      };
    } else {
      data = {
        message: "Table dont have records",
      };
    }
    response.success(req, res, data, 200);
  } catch (error) {}
};
