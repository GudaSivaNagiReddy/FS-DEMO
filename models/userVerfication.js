const mongoose = require("mongoose");


const userOtpVerificationSchema = new mongoose.Schema({
     userId : String ,
     otp : String,
     createdAt : Date,
     expiresAt : Date
})

const userOtpVerification = mongoose.model("userOtpVerification",userOtpVerificationSchema)

module.exports=userOtpVerification;