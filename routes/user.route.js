const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// const verifyToken = require();
router.get("/", userController.getUsers);
router.post("/signup", userController.signUp);
module.exports = router;
