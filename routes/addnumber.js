const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const FormController = require('../controllers/FormController');

router.get('/',PagesController.addnumber);
router.post('/',FormController.addNumber);

module.exports = router;