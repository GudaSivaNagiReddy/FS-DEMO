const { check, body } = require("express-validator");

exports.registerValidation = [
  check("email").isEmail().withMessage("Please provide valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("pls enter the min 4 characters"),
];
exports.loginValidation = [
  check("email").isEmail().withMessage("Please provide register email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("please provide valid password"),
];
