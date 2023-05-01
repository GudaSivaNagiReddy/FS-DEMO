const path = require("path");
const File = require("../models/fileModel");
const nodemailer = require("nodemailer");
const errorMiddleware = require("../middleware/errors");
const errorHandler = require("../util/errorHandler");
// const sendMail= require("../util/mailVerify")

// uploading a files
exports.uploadFile = async function (req, res, next) {
  const fileCreate = new File({
    fileName: req.body.fileName,
    filePath: req.file.filename,
    permission: req.body.permission,
    userId: req.user._id,
  });
  try {
    const savedFile = await fileCreate.save();
    console.log(savedFile);
    res.json({ msg: "uploaded file", savedFile: savedFile });
  } catch (err) {
    return next(new errorHandler("Please upload valid details", 400));

  }
};
// retriving a public files
exports.getFilesPublic = (req, res, next) => {
  File.find({ permission: "public" })
    .then((files) => {
      res.json({ msg: "This is all Public Files", allFiles: files });
    })
    .catch((err) => {
      return next(new errorHandler("Please upload valid details", 400));
    });
};

// retriving a private files
exports.getFilesPrivate = (req, res, next) => {
  File.find({ userId: req.user._id, permission: "private" })
    .then((files) => {
      res.json({ msg: "This is all Private Files", allFiles: files });
    })
    .catch((err) => {
      return next(new errorHandler("Please upload valid details", 400));
    });
};

// exports.downloadFile =(req, res)=>{
//    const fileId = req.params.id;
//    File.find({_id : fileId}).then((file)=>{
//     const directoryPath = __basedir + "/downloads"
//     res.download(directoryPath + fileId, file[0]._doc.filePath, (err) => {
//      if (err) {
//        res.status(500).send({
//          message: "Could not download the file. " + err,
//        });
//      }})
//    })
// }

exports.deleteFile = async function (req, res, next) {
  const fileId = req.params.id;
  File.find({ _id: fileId })
    .then((file) => {
      if (file[0]._doc.userId.toString() !== req.user._id.toString()) {
        return next(
          new errorHandler("You can not delete another user files", 401)
        );
      }
      File.deleteOne({ _id: fileId, userId: req.user._id })
        .then((result) => {
          if (!file) {
            return next(new errorHandler("File is not Found", 404));
          }
          res.json({ msg: "file Deleted", status: result });
        })
        .catch((err) => {
          return next(new errorHandler("Your file is not deleted", 400));
        });
    })
    .catch((err) => {
      return next(new errorHandler("Your file is not deleted", 400));
    });
};

// deleting a files
exports.deleteAllFiles = (req, res, next) => {
  File.deleteMany()
    .then((response) => {
      res.json({ msg: "Deleted all files" });
    })
    .catch((err) => {
      return next(new errorHandler("Your files are not deleted", 400));
    });
};
