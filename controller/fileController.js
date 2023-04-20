const File = require("../models/fileModel")


// exports.sizeFile = async (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(501).json({ multer: err.message + " .Your file is above 2MB.So upload file within 2MB" });
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       return res.status(501).json({ message: err.message });
//     }
//     // const fileInput = req.file.filename;
//     // const file = new File({
//       //   name: fileInput
//       // })
//       // await file.save()
//       res.json({ msg: "Your file is successfully uploaded" })
      
//     })
//     // const fileInput = req.file.filename;
//     // const file = new File({
//     //   name: fileInput
//     // })
//     // await file.save()
//   }
  
  exports.createFile = async function(req, res){
    /* Initializing the schema and putting in CRUDcreate */
    const CRUDcreate = new File ({
      myFile : req.file.filename,
      userId : req.user._id
    });
    
    /* Try Catch */
    try{
      /* Saving the data in mongoose */
      const savedCRUD = await CRUDcreate.save();
      /* Sending the response back */
      res.status(200);
      res.send(savedCRUD);
    }catch(err){
      /* Sending the error back */
      res.status(400).send(err);
    }
  }
  
  exports.deleteFile = async function(req, res){
    /* Taking the id of the collection */
    let id = req.body._id;
    try{
      /* Using findbyIdAndRemove operation to remove
      the data with corresponding id */
      const CRUDdel = await File.findByIdAndRemove(
      id, function(err, res){
        if (err){
          /* Sending error back to the server */
          res.status(400).send(err);
          console.log(err)
        }
        else{
          
          /* Sending the response back to the server */
          console.log("Removed User : ", res);
        }
      },
      {
        useFindAndModify: false
      })
    }catch(err){
      res.status(400).send(err);
    }
  }
  
