const express = require("express");
const router = express.Router();
const fileController = require("../controller/fileController")

router.get("/getPublic",fileController.getFilesPublic);
router.get("/getPrivate",fileController.getFilesPrivate);

router.post("/deleteFile/:id",fileController.deleteFile);
router.post('/delete-all', fileController.deleteAllFiles);
router.post('/download-files', fileController.downloadFile)


module.exports = router;
