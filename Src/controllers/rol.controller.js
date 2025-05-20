const rol = require("../models/rol.mode")
const response = require("../res/response")

const getAll = async (req, resp, next) => {
  try {
    const roles = await rol.findAll();
    let data = "";

    if (roles.length > 0) {
      data = {
        total_reg: roles.length,
        data: roles,
      };
    } else {
      data = { message: "This table has no records" };
    }

    response.success(req, resp, data, 200);
  } catch (error) {
    next(error);
  }
};

// Obtener un registro por ID
const getOne = async (req, resp, next) => {
  try {
    const id = req.params.id;
    const rolFound = await rol.findOne({ where: { id } });

    let data = rolFound
      ? { data: rolFound }
      : { message: "This query has no records" };

    response.success(req, resp, data, 200);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo registro
const created = async (req, resp, next) => {
  try {
    const data = req.body;
    await rol.sync();
    const created = await rol.create(data);

    const message = {
      msg: "Record was created successfully",
      regID: created.id,
    };

    response.success(req, resp, message, 201);
  } catch (error) {
    next(error);
  }
};

// Actualizar un registro existente
const updated = async (req, resp, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await rol.update(data, { where: { id } });

    const message = {
      msg: "Record was updated successfully",
      regID: id,
    };

    response.success(req, resp, message, 200);
  } catch (error) {
    next(error);
  }
};

// Eliminar un registro
const deleted = async (req, resp, next) => {
  try {
    const id = req.params.id;

    await rol.destroy({ where: { id } });

    const message = {
      msg: "Record was deleted successfully",
      regID: id,
    };

    response.success(req, resp, message, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  created,
  updated,
  deleted,
};