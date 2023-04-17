const express = require("express");
var router = express.Router();
const fileController = require("../controller/fileController")
/* Initializing other routes */
router.post("/upload", (req,res)=>{fileController.uploadFile});
router.post("/upload-filter", (req,res)=>{fileController.uploadFilter});

module.exports = router;
