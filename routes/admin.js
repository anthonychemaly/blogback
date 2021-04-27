var express = require("express");
var router = express.Router();
var apis = require("../controllers/admin.controller");

router.post("/admin/login", apis.AdminLogin);
router.post("/admin/register", apis.AdminRegister);

module.exports = router;
