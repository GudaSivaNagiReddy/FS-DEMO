const express = require("express");
const router = express.Router();
const fileController = require("../controller/fileController")

router.get("/getPublic",fileController.getFilesPublic);
router.get("/getPrivate",fileController.getFilesPrivate);

router.delete("/deleteFile/:id",fileController.deleteFile);
router.post('/delete-all', fileController.deleteAllFiles);
router.post('/download-file/:id', fileController.downloadFile)


module.exports = router;
