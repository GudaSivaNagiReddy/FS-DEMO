const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const passportConfig =require("./config/passport")
 
dotenv.config();
 
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
   
  // Passport middleware
  app.use(passportConfig.initialize());
  app.use(passportConfig.session());
 
// app.use("/",require("./routes"))


/* Connected the app with mongoose */
mongoose.connect(
    "mongodb://127.0.0.1:27017",
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