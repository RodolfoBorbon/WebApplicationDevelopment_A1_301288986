
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
        res.render('business_contacts/list.ejs', { title: 'Business contacts', ContactsList: contactsList });
    } catch (err) {
        console.log(err);
    }
});

//GET Route for displaying the Add page - CREATE Operation
router.get('/add_contact', async (req, res, next) => {
    try {
        res.render('business_contacts/add_contact.ejs', { title: 'Business contacts' });
    } catch (err) {
        console.log(err);
    }
});

//POST Route for processing the Add page - CREATE Operation
router.post('/add_contact', async (req, res, next) => {
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
});

//GET Route for displaying the Edit page - UPDATE Operation
router.get('/edit_contact/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let contactsToEdit = await Contacts.findById(id);
        res.render('business_contacts/edit_contact.ejs', { title: 'Edit contacts', contacts: contactsToEdit });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//POST Route for processing the Edit page - UPDATE Operation
router.post('/edit_contact/:id', async (req, res, next) => {
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
});

//GET to perform Deletion - DELETE Operation
router.get('/delete_contact/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contacts.findByIdAndRemove(id);
        res.redirect('/contacts-list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

module.exports = router;
