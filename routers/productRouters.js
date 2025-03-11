const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

//ROUTES

//Index
router.get("/", productController.index);

//Show
router.get("/:id", productController.show);

module.exports = router;
