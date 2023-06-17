
/*
File name: index.js
Student’s Name: Rodolfo Borbon
StudentID: 301288986
Date: June 04, 2023
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About me page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About me' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});

/* GET Business Contact List page???????????????????. */


module.exports = router;
