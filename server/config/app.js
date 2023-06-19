/*
File name: app.js
Student’s Name: Rodolfo Borbon
StudentID: 301288986
Date: June 04, 2023
 */
//-------------------------------------------Module dependencies-----------------------------------------------------------
//Install 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//-------------------------------------------Database setup-----------------------------------------------------------
//Database setup
let mongoose = require('mongoose')
let DB = require('./db');

//Point mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

//-------------------------------------------Express Application Setup-----------------------------------------------------------

//Create an Express application instance
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); //Express -e

//middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules'))); //Join up the main directory with node_modules folder 

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//-------------------------------------------Authentication Setup-----------------------------------------------------------
//create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//-------------------------------------------Routing Setup-----------------------------------------------------------

//Routes modules
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list', contactsRouter); //Express -e

//-------------------------------------------Error Handling-----------------------------------------------------------
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
  res.render('error', { title: 'Error'});
});

//-------------------------------------------Export the Express Application-----------------------------------------------------------
//export the express application instance
module.exports = app;
