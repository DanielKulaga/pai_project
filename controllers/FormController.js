const data = require('../data/DAL')
const jwt = require("jsonwebtoken");

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
    //console.log(login + " " + password);
    const responseFromDatabase = await data.searchUserInDatabase([login, password]);
    console.log(responseFromDatabase)
    if(responseFromDatabase[0].length === 0){
        res.status(400).render('error');
    }else{
        const token = jwt.sign(
            { userId: responseFromDatabase[0].id, userLogin: login,},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.json({user:{login, token}})
        console.log("dane poprawne" , responseFromDatabase)
    }
}

