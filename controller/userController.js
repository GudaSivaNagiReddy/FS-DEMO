const crypto = require("crypto");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../util/email");
const ErrorHandler = require("../util/errorHandler");

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ msg: errors.array()[0].msg });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return next(new ErrorHandler("This email is already exist.Please Login using this email",401))
    }
    // Creating the user
    else {
      const token = crypto.randomBytes(32).toString("hex");
      const newUser = new User({
        name,
        email,
        password,
        token,
      });
      // Bcrypt hashing the password for user privacy
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const emailLink = `http://localhost:7000/user/verify/${user.id}/${token}`;
              const text = `<p>Click this <a href="${emailLink}">link</a> to verify you account. It is valid for 1 hour`;
              sendEmail(user.email, "Email Verification", text);
              res.json({ msg: "Successfully Register." });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.emailVerification = (req, res, next) => {
  const userId = req.params.userId;
  const token = req.params.token;
  User.findOne({
    _id: userId,
    token: token,
  })
    .then((user) => {
      user.isVerified = true;
      user.token = undefined;
      user.tokenExpire = undefined;
      return user.save();
    })
    .then((result) => {
      res.send("User email is verified");
    });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ msg: errors.array()[0].msg });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (!user.isVerified) {
      return res.send("Email is Not Verified");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      const token = jwt.sign({ user }, "secretkey", { expiresIn: "1h" });
      res.json({ message: "Successfully login", token: token });
    } else {
      return next(new ErrorHandler("Your password is not correct",401));
    }
  } else {
    return next(new ErrorHandler("User does not exist.Please register",401));
  }
};
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    res.json({ msg: "Successfully logged out" });
  });
};
