const express = require("express");
const router = express.Router();
const product_saleController = require("../controllers/product_saleControllers");

//ROUTES

//CREATE RECEPT
router.post("/new_prod_sale", product_saleController.create_prod_sale);

module.exports = router;
