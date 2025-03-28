const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

//ROUTES

//Index
router.get("/", productController.index);

//Search by title
router.get("/search", productController.searchByTitle);

//Show By Correlated
router.get("/correlated", productController.showByCorrelated);

//Show By Tag
router.get("/brand/:tag_name", productController.showByTag);

//Show
router.get("/:title", productController.show);

//Update Quantity
router.put("/update_quantity", productController.updateQuantity);

module.exports = router;
