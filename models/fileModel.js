const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name : {
    type: String,
    required : true 
  },
  userId: {
    type: Schema.types.ObjectId,
    ref: "User",
    required: true
  }
});

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;