const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// const verifyToken = require();
router.post("/signup", userController.signUp);
module.exports = router;
