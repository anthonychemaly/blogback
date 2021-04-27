var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
  fileName: String,
  type: String,
  url: String,
  blog: { type: Schema.Types.ObjectId, ref: "Blog" },
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  created_at: Date,
});

var Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
