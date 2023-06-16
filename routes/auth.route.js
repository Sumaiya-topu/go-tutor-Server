const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// const verifyToken = require();
router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.patch("/verify", userController.verifyEmail);
module.exports = router;
