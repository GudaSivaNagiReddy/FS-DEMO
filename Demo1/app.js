
//  required packages
const express = require("express");
const bodyParser = require("body-parser");
// const File = require("./models/userModel");
const multer = require("multer");

const app = express();

// Configurations for "body-parser"
app.use(bodyParser.urlencoded({extended: true}));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/user-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === ("pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.post("/api/uploadFile", upload.array('files', 5), async (req, res) => {
      try {
        const newFile = await File.create({
          name: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "File created successfully!",
        });
      } 
      catch (error) {
        res.json({
          error,
        });
    }
  });
//Express server
module.exports = app;