/*
File name: users.js
Student’s Name: Rodolfo Borbon
StudentID: 301288986
Date: June 04, 2023
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
