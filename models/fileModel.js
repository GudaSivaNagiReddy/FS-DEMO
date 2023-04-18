const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  file: {
    type: String,
    required : true 
  }
});

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;