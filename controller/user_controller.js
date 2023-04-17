const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

exports.register = (req, res, next) => {
	console.log("Request: " + JSON.stringify(req.body))
	const { name, email, password ,password2} = req.body;
	let errors = [];

	/* If condition to check whether all credentials are filled */
	if (!name || !email || !password || !password2) {
	errors.push({ msg: 'Please enter all fields' });
	}
	
	/* If condition to check whether password
	and password2 matches or not */
	if (password != password2) {
	errors.push({ msg: 'Passwords do not match' });
	}

	/* If condition to check in case password
	length is greater than 3 or not */
	if (password.length < 3) {
	errors.push({ msg: 'Password must be at least 3 characters' });
	}

	if (errors.length > 0) {
	res.send('register error')
	} else {
	
	/* Checking if user exists */
	User.findOne({ email: email }).then(user => {
		if (user) {
		errors.push({ msg: 'Email already exists' });
		res.send('register user exists');
		}
		/* Creating the user */
		else {
		const newUser = new User({
			name,
			email,
			password
		});
		
		/* Bcrypt hashing the password for user privacy */
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
				.save()
				.then(user => {
					
				res.send("Register Successful");
				})
				.catch(err => console.log(err));
			});
		});
		}
	});
	}
}

exports.login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
/* Authenticating if login was successful or
	not with the help of passport */
passport.authenticate('local', {
	successRedirect: res.send("Login Successful"),
	failureRedirect: res.send("Error in Login"),
	failureFlash: false
})(req, res, next);
}

exports.logout = (req, res) => {
	req.logout();
/* Logging out */
	res.send("User Logout");
}
