const File = require("../models/fileModel");
// const Grid = require("gridfs-stream");
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// Grid.mongo = mongoose.mongo;

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
    res.status(200);
    res.send(savedCRUD);
  } catch (err) {
    /* Sending the error back */
    res.status(400).send(err);
  }
};

exports.getFilesPublic = (req, res, next) => {
  File.find({})
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
  File.find({userId:req.user._id})
    .then((files) => {
      console.log("files Fetched");
      // console.log(files);
      res.status(200).json({ msg: "All Files are fetched", allFiles: files });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteFile = async function (req, res) {
  let fileId = req.params.id;
  try {
    await File.findByIdAndRemove(fileId);
    res.send("File Deleted");
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.downloadFile = async function (req, res) {
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);
  //  let fileId = req.params.id;
  gfs.fineOne({ _id: '644255c3dadf2c36fecc5bff', root: "myFiles" }, (err, file) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!file) {
      return res
        .status(404)
        .send("Error on the database looking for the file.");
    }
    var readstream = gfs.createReadStream({
      _id: _id,
      root: "myFiles",
    });
    readstream.on("error", function (err) {
      res.end();
    });
    readstream.pipe(res);
  });
};

exports.deleteAllFiles = (req, res, next) => {
  File.deleteMany().then((response) => {
    res.send("Deleted all files");
  });
};
