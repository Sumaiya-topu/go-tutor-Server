const express = require("express");
const router = express.Router();
const tuitionController = require("../controller/tuition.controller");
// const verifyToken = require();
router.get("/", tuitionController.getAllTuition);

router.route("/:id").post(tuitionController.createTuition);
router.route("/:id").get(tuitionController.getTuitionById);
router.route("/:id").delete(tuitionController.deleteTuitionById);
router.route("/:id").patch(tuitionController.updateTuitionById);

router.route("/posted-by/:userId").get(tuitionController.getTuitionByUserId);

module.exports = router;
