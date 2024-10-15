const express = require("express");

const router = express.Router();

const multer = require("../config/multer.js");

const usersCtrl = require("../controllers/usersControllers");

//
// ROUTES
//
router.post("/signup",multer, usersCtrl.createNewUser);
router.post("/:email", usersCtrl.loginUser);
router.get("/", usersCtrl.getAllUsers);
router.get("/:userId", usersCtrl.getOneUser);
router.patch("/:userId",multer, usersCtrl.updateUser);
router.delete("/:userId", usersCtrl.deleteUser);

//
// EXPORTS
//
module.exports = router;