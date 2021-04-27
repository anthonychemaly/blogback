const path = require("path");
var jwt_decode = require("jwt-decode");
var Media = require("../models/media");
const Admin = require("../models/admin");
const firebase = require("../firebase");

exports.UploadProfilePic = async (req, res) => {
//   if (!req.files.file) {
//     res.status(400).send("Error: No files found");
//   } else {
    const file = req.files.file;
    const blob = firebase.bucket.file(file);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", () => {
      res.status(200).send("File uploaded.");
      var newMedia = new Media({
        type: file.mimetype,
        //   url: `https://blogback.herokuapp.com/images/${file.name}`,
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
    });

    blobWriter.end(req.files.file);
//   }
};
