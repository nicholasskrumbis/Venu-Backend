var createError = require('http-errors');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var storyRouter = require('./routes/story');
var registerRouter = require('./routes/register');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/story', storyRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const AWS_KEY_ID = "";
const AWS_SECRET = "";
const S3_REGION = "";
const S3_BUCKET = "";
const aws = require("aws-sdk");
const { v4: uuid } = require("uuid");

const access = new aws.Credentials({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_SECRET,
});

const s3 = new aws.S3({
  credentials: access,
  region: S3_REGION,
  signatureVersion: "v4",
});

app.get("/uploadImage", async (req, res, next) => {
  const filename = `${uuid()}.jpg`;
  const signedUrlExpireSeconds = 60 * 15;

  try {
    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: S3_BUCKET,
      Key: filename,
      ContentType: "image/jpeg",
      Expires: signedUrlExpireSeconds,
    });
    res.send({ url: url, filename: filename });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = app;