const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
const register = require('./routes/register')
const login = require('./routes/login')
const contacts = require('./routes/contacts')
const addcontact = require('./routes/addcontact')
const addnumber = require('./routes/addnumber')
const logout = require('./routes/logout')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser()); //obsluga cookies

app.use((req, res, next) => {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];
    // Inject the user to the request
    req.token = authToken;
    // Get userId from the cookies
    const userId = req.cookies['UserId'];
    req.userId = userId;

    next();
});

app.use('/',routes);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);
app.use('/contacts',contacts);
app.use('/addcontact', addcontact);
app.use('/addnumber', addnumber);

module.exports = app;