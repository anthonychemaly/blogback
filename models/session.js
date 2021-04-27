var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  aId: { type: Schema.Types.ObjectId, ref: "Admin" },
  ip: String,
  created_at: Date,
});

var Sessions = mongoose.model("Sessions", sessionSchema);

module.exports = Sessions;
