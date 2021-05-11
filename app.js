var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
var serviceAccount = require("./blog-57c3e-firebase-adminsdk-qr0lj-5c4c3e1de3.json");

// const firebase = require("./firebase");
var Media = require("./models/media");
const Admin = require("./models/admin");

var indexRouter = require("./routes/index");
var adminsRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var storageRouter = require("./routes/storage");
var blogsRouter = require("./routes/blog");
const { default: jwtDecode } = require("jwt-decode");
const Blog = require("./models/blog");
// var fileupload = require("express-fileupload");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "blog-57c3e.appspot.com",
});
const bucket = admin.storage().bucket();

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
// app.use(fileupload());
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
// app.use(upload.single());

app.post("/blogs/image", upload.single("file"), (req, res) => {
  // const token = req.headers.token;
  // const decodedtoken = jwtDecode(token);
  if (!req.file) {
    res.status(400).send("Error: No files found");
  } else {
    // console.log(req.file)
    const blob = bucket.file(req.file.originalname);

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      console.log(err);
    });

    blobWriter.on("finish", () => {
      var newMedia = new Media({
        type: req.file.mimetype,
        url: `https://firebasestorage.googleapis.com/v0/b/blog-57c3e.appspot.com/o/${req.file.originalname}?alt=media`,
        fileName: req.file.filename,
        // admin: decodedtoken.id,
        blog: req.body.blogId,
        created_at: new Date(),
      });

      newMedia.save().then((mediaData) => {
        Blog.findByIdAndUpdate(
          req.body.blogId,
          { image: mediaData._id },
          (err, blogData) => {
            if (err) res.send(err);
            res.send({
              success: true,
              data: blogData,
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
