const express = require("express");

const router = express.Router();

const multer = require("../config/multer.js");

const picturesCtrl = require("../controllers/picturesControllers");

//
// ROUTES
//
router.post("/",multer, picturesCtrl.addPicture);
router.get("/", picturesCtrl.getAllPictures);
router.get("/:picturesId", picturesCtrl.getOnePicture);
router.patch("/:picturesId",multer, picturesCtrl.updatePicture);
router.delete("/:picturesId", picturesCtrl.deletePicture);

//
// EXPORTS
//
module.exports = router;