const path = require("path");
var jwt_decode = require("jwt-decode");
var Media = require("../models/media");
const Admin = require("../models/admin");

exports.UploadProfilePic = async (req, res) => {
  const file = req.files.upload;
  var token = req.body.token || req.query.token || req.headers["token"];
  var decodedtoken = jwt_decode(token);

  file.mv(
    `./public/images/profile/${file.name}`,
    (err, result) => {
      if (err) res.send(err);

      var newMedia = new Media({
        type: file.mimetype,
        url: `https://blogback.herokuapp.com/images/profile/${
          decodedtoken.id + file.name
        }`,
        fileName: file.name,
        admin: decodedtoken.id,
        created_at: new Date(),
      });

      newMedia.save().then((mediaData) => {
        Admin.findByIdAndUpdate(
          decodedtoken.id,
          { picture: mediaData._id },
          (err, adminData) => {
            if (err) res.send(err);
            res.send({
              success: true,
              data: adminData,
            });
          }
        );
      });
    }
  );
};
