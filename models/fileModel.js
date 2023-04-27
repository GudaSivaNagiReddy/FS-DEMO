const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  fileName :{
    type : String,
    required : true
  },
  filePath : {
    type: String,
    required : true 
  },
  permission: {
    type :String,
    enum : ["private","public"],
    default: "public"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
//   sharedWith: [
//     {
//       userId: { type: Schema.Types.ObjectId, ref: "User" },
//       time: { type: Date, default: Date.now },
//     },
//   ]
// },{timestamps: true}
}
);

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;