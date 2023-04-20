const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
dotenv.config();
const multer = require("multer");
const path = require("path")
const bodyparser = require('body-parser');

const userRoutes = require('./routes/users')
const fileRoutes = require('./routes/fileRoutes')
const fileController = require('./controller/fileController');

const User = require("./models/User")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {

  const filetypes = /jpeg|jpg|png|pdf/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error ("File Should be a jpeg|jpg|png|pdf"));
  }
}
upload = multer({
  storage: storage, fileFilter: fileFilter, limits: {
    fileSize: 1024 * 1024 * 2
  }
}).single('myFile');


const store = new MongoDBStore({
    uri : "mongodb://127.0.0.1:27017/fileUpload",
    collection :"mySession"
})

app.use(express.json())
app.use(express.urlencoded({ extended: false}));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(session({secret: "secret", resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });


app.use('/user', userRoutes);
app.use('/user-file',fileRoutes)
app.use('/user/upload',upload,fileController.createFile);


/* Connected the app with mongoose */
mongoose.connect(
    "mongodb://127.0.0.1:27017/fileUpload",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (client, err) =>{
        try{
            console.log("DB is Connected")
        }catch(err){
            console.log(err);
        }
    }
);


/* Setting up server */
app.listen(process.env.PORT, function(){
    console.log("This server port is up and running ");
})