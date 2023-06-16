
//Dependencies required for the Contact List
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our Contacts Model
let Contacts = require('../models/contacts');

//GET Route for the Contact List page - READ Operation
router.get('/', async (req, res, next) => {
    try {
        let contactsList = await Contacts.find();
        console.log(contactsList);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
