var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var admin = require('firebase-admin');
let  serviceAccount =  require('../keys/stock-market-sim-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


import IndexMiddleWare, * as indexRouter from './routes/index';
import * as usersRouter from './routes/users';
import * as testAPIRouter from './routes/testAPI';
import CreateSessionController from './routes/createSession';




var app = express();

var createSessionController = new CreateSessionController();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter.default);

app.use('/users', usersRouter.default);

app.use("/testAPI", testAPIRouter.default);

app.use("/createSession", createSessionController.router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

console.log("5");


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("5");


export = app;
