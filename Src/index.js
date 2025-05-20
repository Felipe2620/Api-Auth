const app = require("./app/app");

const server = app.listen(app.get("port"), () => {
  console.log("Servidor ejecutandose en el puerto", app.get("port"));
});
