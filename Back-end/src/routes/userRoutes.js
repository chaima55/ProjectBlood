const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//login
router.post("/login",userController.login);
//create user
router.post("/create",userController.createUser);

module.exports = router;