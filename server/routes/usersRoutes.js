var express = require("express");
var router = express.Router();
require("dotenv").config();
const usersController = require("../controllers/usersController");
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.get("/profile", userShouldBeLoggedIn, usersController.getProfile);

module.exports = router;
