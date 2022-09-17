//Komunikacja z baza danych


const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
    database: 'contact_book',
});

const addUserToDatabase = async (userToInsert) => {
    const sql = 'INSERT INTO users (login, password) VALUES (?)';
    let response = [];
    try {
        response = await pool.query(sql, [userToInsert]);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response;
}

const searchUserInDatabase = async (userToSearch) => {
    const sql = 'SELECT * FROM users WHERE login=? AND password=?';
    let response = [];
    try {
        response = await pool.query(sql, [userToSearch][0],[userToSearch][1]);
    } catch (err) {
        console.log("DB", err)
        return [];
    }
    return response;
}

const saveTokenIntoDatabase = async (userInfo) => {
    const sql = 'UPDATE users SET token=? WHERE id=?';
    let response = [];
    console.log("Save token to DB for", userInfo);
    try {
        response = await pool.query(sql, [userInfo][0],[userInfo][1]);
    } catch (err) {
        console.error("DB error", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response;
}

const getTokenFromDatabase = async (userId) => {
    const sql = 'SELECT token FROM users WHERE id=?';
    let response = [];
    try {
        response = await pool.query(sql, userId);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response;
}

const removeTokenFromDatabase = async (userId) => {
    console.log("logout user id", userId)
    const sql = 'UPDATE users SET token = NULL WHERE id = ?';
    let response = [];
    try {
        response = await pool.query(sql, userId);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response;
}

const getContactsForUserId = async (userId) => {
    const sql = 'SELECT * FROM contacts WHERE userId=?'; //LEFT JOIN phonenumbers ON contacts.contactID=phonenumbers.contactID
    let response = [];
    try {
        response = await pool.query(sql, userId);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    let contactsArray = [];
    // console.log("Response[0]",contactsArray);
    if(response[0].length !== 0){
       for(const contact of response[0]){
            // console.log("contact: " + contact)
        const numbers = await getContactsForContactId(contact.contactID);
            // console.log("Numbers:" , numbers)
           contactsArray.push({...contact, numbers:numbers})
    }}
    // console.log("Odpowiedz z bazy danych", contactsArray)
    return contactsArray;
}

const getContactsForContactId = async (contactId) => {
    const sql = 'SELECT * FROM phonenumbers WHERE contactID=?'; //LEFT JOIN phonenumbers ON contacts.contactID=phonenumbers.contactID
    let response = [];
    try {
        response = await pool.query(sql, contactId);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response[0];
}

const addNewContact = async (contactToInsert) => {
    const sql = 'INSERT INTO contacts (contactName, contactSurname,contactMail, contactStreetNumber, contactZipCode, nameCity, userId) VALUES (?)';
    let response = [];
    console.log("Contact to insert:", contactToInsert)
    try {
        response = await pool.query(sql, [Object.values(contactToInsert)]);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    console.log("response dodawany kontakt: ", response[0])
    return response;
}

const addNewNumber = async (numberToInsert) => {
    const sql = 'INSERT INTO phonenumbers (phoneType, number, contactID) VALUES (?)';
    let response = [];
    console.log("Number to insert:", numberToInsert)
    try {
        response = await pool.query(sql, [Object.values(numberToInsert)]);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    console.log("number dodawany kontakt: ", response[0])
    return response;
}

module.exports = {
    addUserToDatabase,
    searchUserInDatabase,
    saveTokenIntoDatabase,
    getTokenFromDatabase,
    removeTokenFromDatabase,
    getContactsForUserId,
    getContactsForContactId,
    addNewContact,
    addNewNumber,
}


