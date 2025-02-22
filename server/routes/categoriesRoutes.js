var express = require("express");
var router = express.Router();
require("dotenv").config();
const { getCategories } = require("../controllers/categoriesController");

router.get("/", getCategories);

module.exports = router;
