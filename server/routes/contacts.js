
//Dependencies required for the Contact List
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our Contacts ModelS
let Contacts = require('../models/contacts');
let contactsController = require('../controllers/contacts');

//GET Route for the Contact List page - READ Operation
router.get('/', contactsController.displayContactsList);

//GET Route for displaying the Add page - CREATE Operation
router.get('/add', contactsController.displayAddPage);

//POST Route for processing the Add page - CREATE Operation
router.post('/add', contactsController.processAddPage);

//GET Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', contactsController.displayEditPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', contactsController.processEditPage);

//GET to perform Deletion - DELETE Operation
router.get('/delete/:id', contactsController.performDelete);

module.exports = router;
