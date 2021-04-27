var express = require('express');
var router = express.Router();
var Review = require('../models/reviews');
var apis = require('../controllers/storage.controller')


router.post('/profile', apis.UploadProfilePic);


module.exports = router;
