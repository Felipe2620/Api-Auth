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

const getOne = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id},include: { model: Rol, as: "Role" }});
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
}

const create = async (req, res, next) => {
    const data = req.body;
    await User.sync();
    const created=await User.create(data);
    message={
        message: "User created",
        data: created.id,
    };
    let createdAuth = "";
    if(data.emaiel && data.password){
       await Auth.sync();
       password = await bycrypt.hash(data.password.ToString(), 10);
       createdAuth = await Auth.create({
            id: created.id,
            email: data.email,
            password: password,
        });
        message.AuthID=createdAuth.id;
    }
    response.success(req, res, message, 201);
}
const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const updated = await User.update(data,{where: {id}});
        message = {
            msg: "Record was Updated successfully",
            regID: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error)
    }
}

const deleted = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deleted = await User.destroy({ where: { id } });
        message = {
            msg: "Record was Updated successfully",
            regID: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error)
    }
}
const uploadAvatar = async(req,res,next)=>{
    const { file } = req
    let filePath = file.path;
    let imagePath = `http://localhost:3000/images/users/${file.filename}`;
    let data = {
        avatar: imagePath,
        imagePath: filePath
    };
    try {
        const id = req.params.id;
        const user = await User.findOne({where: {id}});
        if (user.imagePath != null) {
            fs.unlink(user.imagePath,(err)=>{
                if (err) {
                    console.log(err);
                    return
                }
            });
        }
        const updated = await User.update(data,{ where:{id}});
        message = {
            msg: "Image was modified successfully",
            user: req.body.id,
            img: imagePath
        };
        response.success(req,res,message)
    } 
    catch (error) {
        next(error)
    }
}
