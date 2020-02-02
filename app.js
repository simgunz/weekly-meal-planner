const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const glob = require('glob');
const logger = require('morgan');
const mongoose = require('mongoose');

// Connect to the database
const dbAddress =
  'mongodb+srv://simone:lJmrNCrhiv6FpUe3@cluster0-qbm8s.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbAddress, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});

const models = glob.sync('./models/*.js');
models.forEach(function(model) {
  require(model);
});

// Require routers
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', recipesRouter);

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

module.exports = app;
