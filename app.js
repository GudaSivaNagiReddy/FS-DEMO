const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
dotenv.config();

const userRoutes = require('./routes/users')
const fileRoutes = require('./routes/fileRoutes')

const User = require("./models/User")

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const store = new MongoDBStore({
    uri : "mongodb://127.0.0.1:27017/fileUpload",
    collection :"mySession"
})

app.use(session({secret: "secret", resave: false, saveUninitialized: false, store: store}));

app.use('/user', userRoutes);
app.use('/user-file',fileRoutes)



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