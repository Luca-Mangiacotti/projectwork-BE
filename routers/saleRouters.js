const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleControllers");

//ROUTES

//CREATE RECEPT
router.post("/new", saleController.createRecept);

module.exports = router;
