const express = require('express');
const router = express.Router();
const db = require('../config/db.js')
// const auth = require('./authentication')
const path = require('path');
const bodyParser = require('body-parser');
router.get('/api/products', (req, res, next) => {
    db.query(
        `SELECT * FROM products`,
        (pErr, pResults) => {
            // user does not exists
            if (pErr) {
                return res.status(400).send({
                    msg: err
                });
            }
            else {
                res.json({
                    status: 200,
                    results: pResults
                })
            }
        })
});
router.get('/api/users', (req, res, next) => {
    db.query(
        `SELECT * FROM users`,
        (uErr, uResults) => {
            // user does not exists
            if (uErr) {
                return res.status(400).send({
                    msg: err
                });
            }
            else {
                res.json({
                    status: 200,
                    results: uResults
                })
            }
        })
});
module.exports = router;