const path = require("path");
const File = require("../models/fileModel");
const nodemailer = require("nodemailer");
// const sendMail= require("../util/mailVerify")

// uploading a files
exports.uploadFile = async function (req, res) {
  /* Initializing the schema and putting in fileCreate */
  // const email = req.user._doc.email;
  const fileCreate = new File({
    fileName: req.body.fileName,
    filePath: req.file.filename,
    permission:req.body.permission,
    userId: req.user._id,
  });
  /* Try Catch */
  try {
    const savedFile = await fileCreate.save(); 
    // console.log(req.file)
    console.log(savedFile);
    // sendMail()
    res.json({msg : "uploaded file", savedFile : savedFile})
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};
// retriving a public files 
exports.getFilesPublic = (req, res) => {
  // console.log(req.user)
  File.find({permission : "public"})
    .then((files) => {
      console.log("files Fetched");
      // console.log(files);
      res.status(200).json({ msg: "All Files are fetched", allFiles: files });
    })
    .catch((err) => {
      console.log(err);
    });
};

// retriving a private files 
exports.getFilesPrivate = (req, res, next) => {
  File.find({ userId: req.user._id , permission : "private"})
    .then((files) => {
      console.log("files Fetched");
      // console.log(files);
      res.status(200).json({ msg: "user files are fetched", allFiles: files });
    })
    .catch((err) => {
      console.log(err);
    });
};


// deleting a file from the database
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
          if (!file) {
            res.json({ msg: "file is Not Founded" });
          }
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

// deleting a files 
exports.deleteAllFiles = (req, res, next) => {
  File.deleteMany().then((response) => {
    res.status(200).json({msg : "Deleted all files"});
  });
};
