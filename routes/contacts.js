const express = require('express');
const data = require('../data/DAL')
const router = express.Router();
const jwt = require("jsonwebtoken");

const PagesController = require('../controllers/PagesController');

router.get('/', authenticateToken, PagesController.contacts);

// middleware
async function authenticateToken(req, res, next) {
    const token = req.token;
    const userId = req.userId;

    if(!token || !userId ) return res.redirect('/');

    console.log("token auth middleware", token)
    console.log("userId auth middleware", userId)
    const tokenFromDB = await data.getTokenFromDatabase(userId);
    console.log("middlewere token from db", tokenFromDB);

    if(token === null) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token
    if(tokenFromDB[0][0].token == null) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token


    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.status(401).render('error',{message: "Sesja wygasla"}); // send token in request but no longer valid

        req.user = user;
        next()
    });
}

module.exports = router