const mongoose = require("mongoose");

// Connected the app with mongoose 
const connect = () => {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/fileUpload",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) => {
      try {
        console.log("DB is Connected");
      } catch (err) {
        console.log(err);
      }
    }
  );
};
module.exports = connect;
