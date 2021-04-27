var express = require("express");
var router = express.Router();
var apis = require("../controllers/storage.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/profile", upload.single("file"), (req, res) => {
  if (!req.files.file) {
    res.status(400).send("Error: No files found");
  } else {
    const blob = firebase.bucket.file(req.file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
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

    blobWriter.end(req.file.buffer);
  }
});

module.exports = router;
