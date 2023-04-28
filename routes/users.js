const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/auth");

router.post("/register",authController.registerAuth,userController.register);

router.post('/verify/:userId/:token', userController.emailVerification);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

module.exports = router;
