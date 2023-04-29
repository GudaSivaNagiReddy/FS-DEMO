const {check,body}= require('express-validator');

exports.registerAuth = [
    check("email").isEmail().withMessage("Please provide valid email"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("pls enter the min 4 characters"),
  ]