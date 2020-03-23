const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Login authentication
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// load the environmental variables stored in .env
require('dotenv').config();

// Connect to the database
const dbAddress =
  'mongodb+srv://simone:lJmrNCrhiv6FpUe3@cluster0-qbm8s.mongodb.net/meal_planner?retryWrites=true&w=majority';
mongoose.connect(dbAddress, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => {
  throw new Error(`unable to connect to database at ${dbAddress}`);
});

// Require routers
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');

// Routers for login
const userInViews = require('./lib/middleware/userInViews');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

/**
 * Passport Configuration
 */

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL ||
      'http://localhost:3000/callback' ||
      'http://localhost:3001/callback',
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', recipesRouter);

/**
 * Session Configuration
 */

const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

/**
 *  App Configuration for Auth0
 */

app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());

// Use router for login
app.use(userInViews());
app.use('/', authRouter);
app.use('/', usersRouter);

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
