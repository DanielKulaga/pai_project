const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const FormController = require('../controllers/FormController');

router.get('/',PagesController.login);
router.post('/',FormController.searchUser);
router.delete('/',FormController.logoutUser);

module.exports = router;