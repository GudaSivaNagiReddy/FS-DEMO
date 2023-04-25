const User = require("../models/User");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)

const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/fileUpload",
    collection: "mySession",
  });
exports.storeSession=session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
exports.sessionId =  (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
