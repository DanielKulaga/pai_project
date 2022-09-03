const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');

router.get('/',PagesController.home);

router.get('/login',(req, res) => {
    res.render('login')
});


module.exports = router;