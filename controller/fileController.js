const File = require('../models/fileModel');

const path = require('path')
const multer = require('multer')

exports.uploadFile = async (req, res, next) => {
  const file = new File({
        name: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer
      });
      await file.save();
      res.send('File uploaded!');
}

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'uploads/')
	},
	filename: function(req, file, cb){
		let ext = path.extname(file.originalname)
		cb(null, Date.now() + ext);
	}
})

exports.uploadFilter = multer({
	storage: storage,
	fileFilter: function(req, file, callback){
		if(
			file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'
		){
			callback(null, true)
		} else{
			console.log("Error in uploading")
			callback(null, false)
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 2
	}
})