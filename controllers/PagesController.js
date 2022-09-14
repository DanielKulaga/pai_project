const data = require('../data/DAL')

exports.home = (req, res) => {
    res.render('home')
}

exports.register = (req, res) => {
    res.render('register')
}

exports.login = (req, res) => {
    res.render('login')
}

exports.contacts = async (req, res) => {
    const body = req.user;
    const userId = body.userId;

    let contacts;
    try {
        contacts = await data.getContactsForUserId(userId);
    } catch(err) {
        res.status(400).render('error',{message:err});
    }
    console.log("Contacts ", contacts[0])
    res.render('contacts', {data: contacts[0]})
}