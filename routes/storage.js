var express = require('express');
var router = express.Router();
var apis = require('../controllers/storage.controller')


router.post('/profile', apis.UploadProfilePic);


module.exports = router;
