var express = require("express");
var router = express.Router();
var apis = require("../controllers/admin.controller");

router.post("/login", apis.AdminLogin);
router.post("/register", apis.AdminRegister);
router.post("/profilepicture", apis.AdminProfilePicture);

module.exports = router;
