const express = require("express");
const uploader = require("../middleware/uploader");
const router = express.Router();
const imageUploadController = require("../controller/imageUpload.controller");

router.post(
  "/single-image-upload",
  uploader.single("image"),
  imageUploadController.fileUpload
);

module.exports = router;
