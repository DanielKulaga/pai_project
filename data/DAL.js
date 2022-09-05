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

module.exports = {
    addUserToDatabase,
    searchUserInDatabase,
}


