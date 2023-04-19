const express = require("express");
const router = express.Router();
const path = require("path")
// const fileController = require("../controller/fileController")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const fileFilter = (req,file,cb)=>{
  const filetypes=/jpeg|jpg|png/;
  const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
 // Check mime
 const mimetype = filetypes.test(file.mimetype);

 if(mimetype && extname){
     return cb(null,true);
 } else {
  // return res.json({msg : "enter valid"})
 }
}
const upload = multer({ storage : storage , fileFilter:fileFilter
})

router.post("/file-upload",upload.single('myFile'),(req,res)=>{
  res.json({msg:"Your file is successfully uploaded"})
})


module.exports = router;
