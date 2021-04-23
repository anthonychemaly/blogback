const Blog = require("../models/blog");

exports.postBlog = async (req, res) => {
  var blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    image: req.body.image,
  });
  blog.save((err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err,
      });
    } else {
      res.send({
        success: true,
        data: data,
      });
    }
  });
};

exports.getAllBlogs = async (req, res) => {
  Blog.find({}, (err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err,
      });
    } else {
      res.send({
        success: true,
        data: data,
      });
    }
  });
};
