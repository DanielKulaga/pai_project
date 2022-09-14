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
    const sql = 'SELECT contactName,contactSurname,contactMail,contactStreetNumber,nameCity,contactZipCode FROM contacts WHERE userId=?';
    let response = [];
    try {
        response = await pool.query(sql, userId);
    } catch (err) {
        console.error("DB", err.sqlMessage)
        throw err.sqlMessage;
    }
    return response;
}

module.exports = {
    addUserToDatabase,
    searchUserInDatabase,
    saveTokenIntoDatabase,
    getTokenFromDatabase,
    removeTokenFromDatabase,
    getContactsForUserId,
}


