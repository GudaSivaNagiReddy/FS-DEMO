const bcrypt = require("bcryptjs");
const User = require("../models/User");
// const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mailto:gudasiva.reddy@brainvire.com",
//     pass: "Sivanagi9182@",
//   },
// });

exports.register = (req, res, next) => {
  console.log("Request: " + JSON.stringify(req.body));
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ msg: errors.array()[0].msg });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.json({
        msg: "This email is already exist.Please Login using this email",
      });
    }
    // Creating the user
    else {
      const newUser = new User({
        name,
        email,
        password,
      });
      // Bcrypt hashing the password for user privacy
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              var mailOptions = {
                from: "mailto:gudasiva.reddy@brainvire.com",
                to: email,
                subject: "For Verification mail ",
                text: "You are Successfully register",
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
              res.json({ msg: "Successfully Register." });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    //   console.log(validPassword);
    if (validPassword) {
      // req.session.isLogin  = true;
      req.session.user = user;
      const token = jwt.sign({ user }, "secretkey", { expiresIn: "1h" });

      // console.log(req.session);
      res.status(200).json({ message: "Successfully login", token: token });
    } else {
      res.status(400).json({ error: "Your password is not correct" });
    }
  } else {
    res.status(401).json({ error: "User does not exist.Please register" });
  }
};
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    res.json({ msg: "Successfully logged out" });
    console.log(err);
  });
};
