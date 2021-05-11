var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  title: String,
  image: { type: Schema.Types.ObjectId, ref: 'Media' },
  body: String,
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  // author: {
  //     id: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User"
  //     },
  //     username: String
  // },
  // comments: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Comment"
  // }]
});
var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
