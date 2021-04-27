var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
// var firebase = require("firebase/app");
const firebase = require("../firebase");

var indexRouter = require("./routes/index");
var adminsRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var storageRouter = require("./routes/storage");
var blogsRouter = require("./routes/blog");
var fileupload = require("express-fileupload");

var app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.kehjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected Successfully");
    }
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminsRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/upload", storageRouter);

const upload = multer({
  storage: multer.memoryStorage(),
});
app.use(upload.single());

app.post("/upload/profile", upload.single("file"), (req, res) => {
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
