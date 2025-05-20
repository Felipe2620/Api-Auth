const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const config = require("../config"); // Asegúrate de que exista config.js y exporte app.port
const app = express();
const roles = require("../routes/rol.route");

//**Middlewares**//
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//**Configuración del puerto**//
app.set("port", config.app.port);

//**Rutas**//
app.use("/api/roles", roles);

//**Archivos estáticos (como imágenes o documentos)**//
app.use(express.static(path.join(__dirname, "../../uploads")));

//**Manejo de rutas no encontradas**//
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
