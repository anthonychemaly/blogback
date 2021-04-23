var express = require("express");
var router = express.Router();
var apis = require("../controllers/blog.controller");

/* GET users listing. */
router.get("/", apis.getAllBlogs);
router.post("/", apis.postBlog);

module.exports = router;
