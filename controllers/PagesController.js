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
    res.render('contacts', {data: contacts})
}

exports.addcontact = (req, res) => {
    res.render('addcontact')
}

exports.addnumber = (req, res) => {
    const contactId = req.params.contactId;
    res.render('addnumber', {contactId: '/addnumber/' + contactId })
}