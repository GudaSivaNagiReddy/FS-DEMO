const path = require("path");
const File = require("../models/fileModel");
const nodemailer = require("nodemailer");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// Create GridFS stream
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
});

exports.uploadFile = async function (req, res) {
  /* Initializing the schema and putting in fileCreate */
  // const email = req.user._doc.email;
  const fileCreate = new File({
    fileName: req.body.fileName,
    filePath: req.file.path,
    permission:req.body.permission,
    userId: req.user._id,
  });
  /* Try Catch */
  try {
    const savedFile = await fileCreate.save(); 
    // console.log(req.file)
    res.json({msg : "uploaded file", savedFile : savedFile})
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};

exports.getFilesPublic = (req, res) => {
  console.log(req.user)
  File.find()
    .then((files) => {
      console.log("files Fetched");
      // console.log(files);
      res.status(200).json({ msg: "All Files are fetched", allFiles: files });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getFilesPrivate = (req, res, next) => {
  File.find({ userId: req.user._id})
    .then((files) => {
      console.log("files Fetched");
      // console.log(files);
      res.status(200).json({ msg: "user files are fetched", allFiles: files });
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.deleteFile = async function (req, res, next) {
  const fileId = req.params.id;
  File.find({ _id: fileId })
    .then((file) => {
      // console.log(file[0]._doc.userId);
      if (file[0]._doc.userId.toString() !== req.user._id.toString()) {
        return res.json({
          msg: "You cannot delete another user files.",
        });
      }
      File.deleteOne({ _id: fileId, userId: req.user._id })
        .then((result) => {
          // if (!file) {
          //   res.json({ msg: "file is Not Founded" });
          // }
          res.json({ msg: "file Deleted", status: result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteAllFiles = (req, res, next) => {
  File.deleteMany().then((response) => {
    res.status(200).json({msg : "Deleted all files"});
  });
};
