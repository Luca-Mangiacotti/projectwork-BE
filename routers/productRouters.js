const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

//ROUTES

//Index
router.get("/", productController.index);

//Show
router.get("/:id", productController.show);

//Show By Tag
router.get("/brand/:tag_id", productController.showByTag);

module.exports = router;
