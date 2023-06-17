
//Dependencies required for the Contact List
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our Contacts Model
let Contacts = require('../modules/contacts');

//GET Route for the Contact List page - READ Operation
router.get('/', async (req, res, next) => {
    try {
        let contactsList = await Contacts.find();
        
        //show the view for the contacts-list
        res.render('partials/business_contacts.ejs', { title: 'Business Contacts List', ContactsList: contactsList });

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
