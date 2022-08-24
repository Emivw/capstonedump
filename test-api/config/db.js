require('dotenv').config();
const { createPool } = require('mysql2');
const connection = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    port: process.env.dbPort,
    database: process.env.database,
});
let db = {};

// ***Requests to the User table ***

db.allUser = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users ', (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};


db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users WHERE email = ?', [email], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};



db.insertUser = (fullname, email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO Users (fullname, email, password) VALUES (?,  ?, ?)', [fullname, email, password], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateUser = (fullname, role_id, email, password, id) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE User SET fullname = ?, role_id= ?, email= ?, password=? WHERE id = ?', [fullname, role_id, email, password, id], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};



db.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM User WHERE id = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve(console.log("User deleted"));
        });
    });
};
module.exports = connection;