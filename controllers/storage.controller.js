const path = require("path");
var jwt_decode = require("jwt-decode");
var Media = require("../models/media");
const Admin = require("../models/admin");
var firebase = require("firebase/app");
import "firebase/storage"; // <----

const storageRef = firebase.storage().ref();

exports.UploadProfilePic = async (req, res) => {
  const file = req.files.upload;
  storageRef.put(file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
  //   var token = req.body.token || req.query.token || req.headers["token"];
  //   var decodedtoken = jwt_decode(token);
  //   uploadFile(bucketName, filePath, destFileName);
  //   file.mv(`./public/images/${file.name}`, (err, result) => {
  //     if (err) res.send(err);

  //     var newMedia = new Media({
  //       type: file.mimetype,
  //       url: `https://blogback.herokuapp.com/images/${file.name}`,
  //       fileName: file.name,
  //       admin: decodedtoken.id,
  //       created_at: new Date(),
  //     });

  //     newMedia.save().then((mediaData) => {
  //       if (err) res.send(err);
  //       res.send({
  //         success: true,
  //         data: mediaData,
  //       });
  //   Admin.findByIdAndUpdate(
  //     decodedtoken.id,
  //     { picture: mediaData._id },
  //     (err, adminData) => {
  //       if (err) res.send(err);
  //       res.send({
  //         success: true,
  //         data: adminData,
  //       });
  //     }
  //   );
  //     });
  //   });
};
