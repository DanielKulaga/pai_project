const express = require('express');
const data = require('../data/DAL');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");

const PagesController = require('../controllers/PagesController');

router.get('/', authenticateToken.authenticateToken, PagesController.contacts);

module.exports = router