
// require modules for the controller
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the user model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

// create an instance of the index controller object
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About me', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

//display the login page
module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if (!req.user) 
    {
        res.render('authentication/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else 
    {
        return res.redirect('/');
    }
}

//process the login request
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server error?
        if (err) 
        {
            return next(err);
        }
        //is there a user login error?
        if (!user) 
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if (err) 
            {
                return next(err);
            }
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

//display the register page
module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not already logged in
    if (!req.user) 
    {
        res.render('authentication/register', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else 
    {
        return res.redirect('/');
    }
}

//process the register page
module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    
    //register the user
    User.register(newUser, req.body.password, (err) => {
        if (err) 
        {
            console.log(err);
            if (err.name == "UserExistsError") 
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('authentication/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else 
        {
            //if no error exists, then registration is successful
            //redirect the user
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts-list')
            });
        }
    });
}

//perform logout
module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) 
        {
            //Handle error
            console.log(err);
            return next(err);
        }
        res.redirect('/');
    })

}