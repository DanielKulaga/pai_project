const data = require('../data/DAL')
const jwt = require("jsonwebtoken");

function generateAccessToken(id, login) {
    return jwt.sign(
        { userId: id, userLogin: login},
        process.env.TOKEN_KEY,
        {
            expiresIn: "1000s",
        });
}

exports.addUser = async (req, res) => {
    const body = req.body;     //odczytanie informacji z requesta, ktore sa w body
    let login = body.login;
    let password = body.password;
    let user = {};
    try {
        user = await data.addUserToDatabase([login, password]);
    }catch(err){
        res.status(400).render('error',{message:err});
    }
    res.redirect('/login')

}

exports.searchUser = async (req, res) => {
    const body = req.body;     //odczytanie informacji z requesta, ktore sa w body
    let login = body.login;
    let password = body.password;
    const responseFromDatabase = await data.searchUserInDatabase([login, password]);
    console.log("User response from DB", responseFromDatabase[0][0]);

    const userFromDB = responseFromDatabase[0][0];

    if(responseFromDatabase[0].length === 0) {
        res.status(400).render('error', {message: "Niepoprawny login lub hasło"});
    } else {
        const accessToken = generateAccessToken(userFromDB.id, login);

        try {
            await data.saveTokenIntoDatabase([accessToken, userFromDB.id])
        }catch(err){
            console.log("Error", err);
        }

        res.cookie('AuthToken', accessToken);
        res.cookie('UserId', userFromDB.id);

        res.redirect('/contacts');
    }
}

exports.logoutUser = async (req, res) => {
    const userID = req.cookies['UserId'];
    try {
        await data.removeTokenFromDatabase(userID);
    }catch(err){
        console.log("Error", err);
    }
    res.cookie('AuthToken', undefined);
    res.cookie('UserId', undefined);
    res.redirect('/');
}

exports.addContact = async (req, res) => {
    const body = req.body;     //odczytanie informacji z requesta, ktore sa w body
    const userId = req.userId;

    let user = {};
    try {
        user = await data.addNewContact({...body, userId});
    }catch(err){
        res.status(400).render('error',{message:err});
    }
    res.redirect('/addnumber')

}

exports.addNumber = async (req, res) => {
    const body = req.body;     //odczytanie informacji z requesta, ktore sa w body
    const phoneNumberID = req.phoneNumberID;

    let user = {};
    try {
        user = await data.addNewNumber({...body, phoneNumberID});
        alert("Udało sie dodac nowy kontakt do bazy!")
    }catch(err){
        res.status(400).render('error',{message:err});
    }
    res.redirect('/contacts')

}

