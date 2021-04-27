var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var adminSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  picture: { type: Schema.Types.ObjectId, ref: 'Media' },
  role: String,
});

adminSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  } else {
    next();
  }
});

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
