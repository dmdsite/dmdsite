var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addRouter = require('./routes/add');
var loginRouter = require('./routes/login');
var mainRouter = require('./routes/main');

//db연결
var db=require('./db/db')

//db crud 사용

// var userController=require('./user/userController');




// >>>>>>> 1b005fed76b30c5cd8e9fb69245a072b83dac566


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use('/', mainRouter);
app.use('/add', addRouter);
app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/main', mainRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
