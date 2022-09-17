const data = require("../data/DAL");
const jwt = require("jsonwebtoken");

// middleware
async function authenticateToken(req, res, next) {
    const token = req.token;
    const userId = req.userId;

    if(!token || !userId ) return res.redirect('/');

    if(token === "undefined" || userId === "undefined" ) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token

    console.log("token auth middleware", token)
    console.log("userId auth middleware", userId)
    const tokenFromDB = await data.getTokenFromDatabase(userId);
    console.log("middlewere token from db", tokenFromDB);

    if(token === null) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token
    if(tokenFromDB[0][0].token == null) return res.status(401).render('error',{message: "Musisz sie zalogowac"}); // request without token


    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if(err) return res.status(401).render('error',{message: "Sesja wygasła"}); // send token in request but no longer valid

        req.user = user;
        next()
    });
}

module.exports = {
    authenticateToken,
}