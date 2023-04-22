const File = require("../models/fileModel");
var nodemailer = require("nodemailer");
// const Grid = require("gridfs-stream");
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// Grid.mongo = mongoose.mongo;
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");

// exports.sizeFile = async (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(501).json({ multer: err.message + " .Your file is above 2MB.So upload file within 2MB" });
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       return res.status(501).json({ message: err.message });
//     }
//       res.json({ msg: "Your file is successfully uploaded" })

//     })
//   }

exports.createFile = async function (req, res) {
  /* Initializing the schema and putting in CRUDcreate */
  const email = req.user._doc.email;
  const CRUDcreate = new File({
    name: req.body.name,
    myFile: req.file.filename,
    userId: req.user._id,
  });

  /* Try Catch */
  try {
    /* Saving the data in mongoose */
    const savedCRUD = await CRUDcreate.save();
    /* Sending the response back */
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailto:gudasiva.reddy@brainvire.com",
        pass: "Sivanagi9182@",
      },
    });
    var mailOptions = {
      from: "mailto:gudasiva.reddy@brainvire.com",
      to: email,
      subject: "Created for file",
      text: `your file ${req.body.name} is uploaded`,
    };
    console.log(email);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200);
    res.send("File created");
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};

exports.getFilesPublic = (req, res, next) => {
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
  File.find({ userId: req.user._id })
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

exports.downloadFile = asyncWrapper(async (req, res, next) => {
  const id  = req.params.id;
  const item = await File.findById(id);
  if (!item) {
    return next(new Error("No item found"));
  }
  const file = File.file;
  const filePath = path.join(__dirname, "../public/file");
  res.download(filePath);
});

exports.deleteAllFiles = (req, res, next) => {
  File.deleteMany().then((response) => {
    res.send("Deleted all files");
  });
};
