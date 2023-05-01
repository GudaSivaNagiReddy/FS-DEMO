const dotenv = require("dotenv");
dotenv.config();

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development"){
      res.status(err.statusCode).json({
          success : false,
          errors : err,
          errMessage : err.message,
          stack : err.stack
      })
  }
  if (process.env.NODE_ENV === "Production"){
      let error ={...err};
      error.message= err.message
      res.status(err.statusCode).json({
          success : false,
          message : error.message || "Internal Server Error"
      })
  }
};
