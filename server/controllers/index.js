
// require modules for the controller
var express = require('express');
var router = express.Router();

// create an instance of the index controller object
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About me' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact' });
}