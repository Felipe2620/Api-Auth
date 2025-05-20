const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");

router.get("/", rolController.getAll);
router.get("/:id", rolController.getOne);
router.post("/", rolController.created);
router.put("/:id", rolController.updated);
router.delete("/:id", rolController.deleted);

module.exports = router;
