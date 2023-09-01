const express = require("express");
const router = express.Router();
const tuitionController = require("../controller/tuition.controller");
// const verifyToken = require();
router.get("/", tuitionController.getAllTuition);

router.route("/:id").post(tuitionController.createTuition);
router.route("/:id").get(tuitionController.getTuitionById);

module.exports = router;
