var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var firebase = require("firebase/app");

var indexRouter = require("./routes/index");
var adminsRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var storageRouter = require("./routes/storage");
var blogsRouter = require("./routes/blog");
var fileupload = require("express-fileupload");

var app = express();

var firebaseConfig = {
  apiKey: "AIzaSyCmrf3WUwUy5H1P-onTWVK8lCHdXq2yU2c",
  authDomain: "blog-57c3e.firebaseapp.com",
  projectId: "blog-57c3e",
  storageBucket: "blog-57c3e.appspot.com",
  messagingSenderId: "98330484483",
  appId: "1:98330484483:web:b360ef49b3d34192319336",
  measurementId: "G-RNS35E7QDQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
