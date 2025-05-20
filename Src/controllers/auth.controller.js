const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const response = require("../res/response");
const bycrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const { where } = require("sequelize");

async function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const data = await auth.findOne({ where: { email: email } });
    const user = await user.findOne({ where: { email: email } });
    const resp = await validatePassword(password, data.password, data, user);
  } catch (error) {
    next(error);
  }
}

const validatePassword = async (pass1, pass2, data, user) => {
  return bycrypt.compare(pass1, pass2).then((result) => {
    if (res == true) {
      data.Roleid = user.Roleid;
      var resp = {
        token: auth.assignToken(...data),
        user:user,
      };
      return resp;
    }else {
      throw new Error("Invalid information");
    }
  });
};
