const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

//ROUTES

//CREATE USER
router.post("/new_user", userController.createUser);

module.exports = router;
