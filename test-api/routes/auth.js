const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const db = require('../config/db');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/signup', express.json(), (req, res) => {
    let emails = `SELECT email FROM Users WHERE ?`;
    let email = {
        email: req.body.email
    }
    db.query(emails, email, async (err, results) => {
        if (err) throw err
        // VALIDATION
        if (results.length > 0) {
            res.send("The email provided is already registered. Enter another email to successfully register");
        } else {
            const bd = req.body;

            let generateSalt = await bcrypt.genSalt();
            bd.password = await bcrypt.hash(bd.password, generateSalt);
            console.log(bd);
            // Query
            const insertIntoUsers =
                `
            INSERT INTO Users(fullname, email, password, role_id, phone, createdAt, updatedAt)
            VALUES(?, ?, ?, ?, ?, NOW(), NOW());
            `;
            //
            db.query(insertIntoUsers,
                [bd.fullname, bd.email, bd.password, 1, bd.phone],
                (err, results) => {
                    if (err) throw err;
                    res.send(`number of affected row/s: ${results.affectedRows}`);
                })
        }
    })
})
// LOGIN
router.post('/login', bodyParser.json(), (req, res) => {
    const users = `SELECT * FROM Users WHERE ? ;`;
    let user = {
        email: req.body.email
    };
    db.query(users, user, async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            res.send('Email not found. Please register')
        } else {
            const isMatch = await bcrypt.compare(req.body.password, results[0].password);
            if (!isMatch) {
                res.send('Password is Incorrect')
            } else {
                const payload = {
                    user: {
                        fullname: results[0].fullname,
                        email: results[0].email,
                        password: results[0].password,
                        userRole: results[0].userRole,
                        phone: results[0].phone,
                        createdAt: results[0].createdAt,
                        updatedAt: results[0].updatedAt,
                    },
                };
                jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "365d" }, (err, token) => {
                    if (err) throw err;
                    res.cookie("LegitUser", token, {
                        // 2.592e+8 = 3 days
                        maxAge: 2.592e+8,
                        httpOnly: true
                    });
                    res.send(token)
                }
                );
            }
        }
    })
})
module.exports = router;