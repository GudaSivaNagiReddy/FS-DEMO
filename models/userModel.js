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
  token : String,
  isVerified : {
    type : Boolean,
    default: false
  },
});

/* Exporting schema with collection*/
const User = mongoose.model("User", UserSchema);

module.exports = User;
