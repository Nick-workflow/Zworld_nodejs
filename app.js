//获取模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//加载路由模块
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use('/', index);
app.use('/users', users);  /*当http://localhost:3000/login.html通过Ajax表单提交form时,
                            提交路径action='users/....',后面的看./routes/users中有没有对这个路径进行限制
                            进入users(变量)所代表的路径中*/

//只要改上面的两块,其余不用动

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//在public目录下，是不需要经过路由
app.use(express.static(path.join(__dirname, 'public')));
console.log(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
