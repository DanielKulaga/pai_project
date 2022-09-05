const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
const register = require('./routes/register')
const login = require('./routes/login')
const contacts = require('./routes/contacts')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser()); //obsluga cookies

app.use('/',routes);
app.use('/register',register);
app.use('/login',login);
app.use('/contacts',contacts);

module.exports = app;