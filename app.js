const express = require('express');
const hbs = require( 'express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

//Cors Implementation
const whitelist = (env.CORS_DOMAINS).toString().split(',');
const co = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(co));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( '.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(cookieParser());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: false
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'netdevv',
  maxAge: 30*24*60*60*1000, //30 days
  keys: [env.PASSPORT_SECRET]
}));

//CSRF Implementation
const csrfMiddleware = csrf({
  cookie: true,
  sameSite: 'strict',
  httpOnly: false
});
// app.use(csrfMiddleware);

//Database
require('./database/database');

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-config');

// catch errors and forward to error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Auth routes setup
// app.use(history());
app.use('/auth', authRoutes);
app.use('/', indexRouter);


module.exports = app;
