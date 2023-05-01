const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validationController = require("../controller/validation");

router.post("/register",validationController.registerValidation,userController.register);

router.post('/verify/:userId/:token', userController.emailVerification);

router.post("/login", validationController.loginValidation,userController.login);

router.post("/logout", userController.logout);

module.exports = router;
