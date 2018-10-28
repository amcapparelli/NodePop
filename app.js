var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('./lib/i18n_configure')()
app.use(i18n.init)

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Variables globales de la aplicación
app.locals.title = 'Nodepop'

require('./lib/connMongoose');

//Registro Modelo de anuncios
require('./lib/createModels');

//Rutas del API
app.use('/apiv1/adsdata',      require('./routes/apiv1/adsdata'));
app.use('/apiv1/authenticate', require('./routes/apiv1/authentication'));
app.use('/apiv1/*',            require('./routes/apiv1/404'));

//Rutas de la app
app.use('/lang', require('./routes/lang'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // error de validación al obtener listado de anuncios por peticiones GET
  if (err.array) {
    err.status = 422
    const errorInfo = err.array({onlyFirstError: true})[0]
    err.message = `Not valid - Error in parameter: ${errorInfo.param}. Reason: ${errorInfo.msg} `
  }

  // error de validacion al publicar anuncios por POST
  if (err.name === 'ValidationError') {
    err.status = 422
    err.message = `Validation error, add not published: - ${err.message} `
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
