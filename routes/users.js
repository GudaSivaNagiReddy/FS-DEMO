const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

const {check,body}= require('express-validator/check');

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Please provide valid email"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("pls enter the min 4 characters"),
  ],
  userController.register

);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

module.exports = router;
