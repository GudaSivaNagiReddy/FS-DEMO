const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");

// importing a router files
const ErrorMiddleware = require("./middleware/errors")
const userRoutes = require("./routes/userRouters");
const fileRoutes = require("./routes/fileRoutes");
const fileController = require("./controller/fileController");

const connect = require("./config/dbConnection");
const authentication=require("./middleware/authentication")
const multer = require("./middleware/multer");

app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static("./public"));

app.use("/user", userRoutes);
app.use("/userFile", fileRoutes);
app.use("/userFile/upload", authentication,multer, fileController.uploadFile);


//handling the errors
app.use(ErrorMiddleware)
//  Setting up server 
const serverConnection = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, function () {
      console.log("This server port is up and running ");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
serverConnection();
