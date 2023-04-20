const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  myFile : {
    type: String,
    required : true 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;