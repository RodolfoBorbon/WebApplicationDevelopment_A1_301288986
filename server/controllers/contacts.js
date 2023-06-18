//Dependencies required for the Contact List
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our Contacts Model
let Contacts = require('../modules/contacts');

//GET Route for the Contact List page - READ Operation
module.exports.displayContactsList = async (req, res, next) => {
    try {
        let contactsList = await Contacts.find();
        
        //show the view for the contacts-list
        res.render('business_contacts/list.ejs', { title: 'Business contacts', ContactsList: contactsList });
    } catch (err) {
        console.log(err);
    } 
};

//GET Route for displaying the Add page - CREATE Operation
module.exports.displayAddPage = async (req, res, next) => {
    try {
        res.render('business_contacts/add.ejs', { title: 'Business contacts' });
    } catch (err) {
        console.log(err);
    }
}

//POST Route for processing the Add page - CREATE Operation
module.exports.processAddPage = async (req, res, next) => {
    let newContact = Contacts({
        "Name": req.body.name,
        "Number": req.body.number,
        "Email": req.body.email
    });
    try {
        await newContact.save();
        res.redirect('/contacts-list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//GET Route for displaying the Edit page - UPDATE Operation
module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;
    try {
        let contactsToEdit = await Contacts.findById(id);
        res.render('business_contacts/edit.ejs', { title: 'Edit contacts', contacts: contactsToEdit });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//POST Route for processing the Edit page - UPDATE Operation
module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;
    let updatedContacts = {
        "Name": req.body.name,
        "Number": req.body.number,
        "Email": req.body.email
    }

    try {
        await Contacts.updateOne({ _id: id }, updatedContacts);
        res.redirect('/contacts-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//GET to perform Deletion - DELETE Operation
module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contacts.findByIdAndRemove(id);
        res.redirect('/contacts-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};