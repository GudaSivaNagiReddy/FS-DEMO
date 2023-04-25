const mongoose = require("mongoose");

/* Creating the schema with name, email, password and date */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,	
    default: Date.now,
  },
});

/* Exporting schema with collection as CrudOperations */
const User = mongoose.model("User", UserSchema);

module.exports = User;
