const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const PagesController = require('../controllers/PagesController');

router.get('/', authenticateToken, PagesController.contacts);

// middleware
function authenticateToken(req, res, next) {
    const token = req.token;
    console.log("token auth middleware", token)
    if(token == null) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.status(401).render('error',{message: "Sesja wygasla"}); // send token in request but no longer valid

        req.user = user;
        next()
    });

}

module.exports = router