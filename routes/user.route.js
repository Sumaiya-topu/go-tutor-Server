const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
// const verifyToken = require();
router.get("/", userController.getUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  //   .delete(userController.deleteUser)
  .patch(userController.updateUser);
module.exports = router;
