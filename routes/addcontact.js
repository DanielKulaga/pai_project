const express = require('express');
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const FormController = require('../controllers/FormController');

router.get('/', authenticateToken.authenticateToken, PagesController.addcontact);
router.post('/',FormController.addContact);

module.exports = router;