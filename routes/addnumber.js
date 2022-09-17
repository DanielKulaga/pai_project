const express = require('express');
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const FormController = require('../controllers/FormController');

router.get('/:contactId', authenticateToken.authenticateToken, PagesController.addnumber);
router.post('/:contactId',FormController.addNumber);

module.exports = router;