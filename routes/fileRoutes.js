const express = require("express");
const router = express.Router();
const fileController = require("../controller/fileController")
const auth=require("../middleware/authentication")

router.get("/getPublic",auth,fileController.getFilesPublic);
router.get("/getPrivate",auth,fileController.getFilesPrivate);

router.delete("/deleteFile/:id",auth,fileController.deleteFile);
router.delete('/delete-all', auth,fileController.deleteAllFiles);
// router.post('/download-file/:id', auth,fileController.downloadFile)


module.exports = router;
