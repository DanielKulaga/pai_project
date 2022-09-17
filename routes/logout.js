const express = require('express');
const router = express.Router();

const FormController = require("../controllers/FormController");

router.get('/', FormController.logoutUser);

module.exports = router;