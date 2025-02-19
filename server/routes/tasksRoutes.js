const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const tasksController = require("../controllers/tasksController");

router.use(userShouldBeLoggedIn);
router.get("/", tasksController.getTasks);
router.get("/:id", tasksController.getTaskById);
router.post("/", tasksController.addTask);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
