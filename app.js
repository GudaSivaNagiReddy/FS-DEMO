const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const bodyparser = require("body-parser");

const userRoutes = require("./routes/users");
const fileRoutes = require("./routes/fileRoutes");
const fileController = require("./controller/fileController");

const connect = require("./server");
const multer = require("./middleware/multer");
const userSession = require("./util/userSession");

app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static("./public"));
app.use(userSession.storeSession);
app.use(userSession.sessionId);

app.use("/user", userRoutes);
app.use("/userFile", fileRoutes);
app.use("/userFile/upload", multer, fileController.createFile);

/* Setting up server */
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
