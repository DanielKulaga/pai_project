const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const FormController = require('../controllers/FormController');

router.get('/',PagesController.addcontact);
router.post('/',FormController.addContact);

module.exports = router;