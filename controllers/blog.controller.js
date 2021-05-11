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

exports.updateBlog = async (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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

exports.deleteBlog = async (req, res) => {
  Blog.findByIdAndDelete(req.params.id, (err, data) => {
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

exports.getBlog = async (req, res) => {
  Blog.findById(req.params.id)
    .populate("image")
    .exec((err, data) => {
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
