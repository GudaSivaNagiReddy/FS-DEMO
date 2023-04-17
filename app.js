const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const passport=require('./config/passport');
const session = require('express-session')
 
dotenv.config();

const userRoutes = require('./routes/users')
const fileRoutes = require('./routes/fileRoutes')

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
// app.use(passport.initialize());
// app.use(passport.session());
 
// app.use("/",require("./routes"))
app.use('/user', userRoutes);
app.use('/file',fileRoutes)
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