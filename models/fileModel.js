const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: String,
  contentType: String,
  data: Buffer
});

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;