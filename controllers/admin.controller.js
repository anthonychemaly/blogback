var Admin = require("../models/admin");
var Sessions = require("../models/session");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// var jwt_decode = require("jwt-decode");
var config = require("../config");

exports.AdminLogin = async function (req, res, next) {
  //Find The User
  Admin.findOne({
    email: req.body.email,
  }).then(function (admin, err) {
    if (err) throw err;

    if (!admin) {
      res.json({
        success: false,
        message: "Authentication failed. Admin not found.",
      });
    } else if (admin) {
      bcrypt.compare(
        req.body.password,
        admin.password,
        function (err, compRes) {
          if (!compRes) {
            res.json({
              success: false,
              message: "Wrong Password",
            });
          } else {
            var payload = {
              id: admin._id,
              role: "admin",
            };
            var token = jwt.sign(payload, config.secret);

            Admin.findById(admin._id).populate('picture').exec((err, result)=> {
              var newSession = new Sessions({
                ip: req.body.ip,
                aId: result._id,
                created_at: new Date(),
              });
              newSession.save().then((sessionData) => {
                res.send({
                  success: true,
                  id: result._id,
                  user: result,
                  token: token,
                  name: result.name,
                });
              });
            });
          }
        }
      );
    }
  });
};

exports.AdminRegister = async (req, res) => {
  var admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    created_at: new Date(),
  });
  admin
    .save()
    .then((data) => {
      res.send({
        success: true,
        data: data,
        message: "Admin created",
      });
    })
    .catch((err) => {
      res
        .send({
          success: false,
          error: err,
          message: "Admin already exists",
        })
        .status(409);
    });
};

exports.AdminProfilePicture = async function (req, res, next) {};
