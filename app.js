const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
dotenv.config();

const userRoutes = require('./routes/users')
const fileRoutes = require('./routes/fileRoutes')

app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use('/user', userRoutes);
app.use('/user-file',fileRoutes)

const store = new MongoDBStore({
    uri : "mongodb://127.0.0.1:27017/fileUpload",
    collection :"mySession"
})

// Express session
app.use(
    session({
      secret: 'This is a secret',
      resave: false,
      saveUninitialized: true,
      store:store,
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((reqUser) => {
        req.user = reqUser;
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