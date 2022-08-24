const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const app = express();
// set up port
const PORT = process.env.PORT || 10000;
// parse requests of content-type - application/x-www-form-urlencoded
// allow access to fetch data from the api externally by  Seting header
app.use(express.json(), bodyParser.json(), cookieParser(), bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
}, cors({
    origin: ['http://192.168.9.28:8080', 'http://localhost:8080'],
    credentials: true
}));
app.get('/', (req, res) => {
    res.json({ message: 'restfull-api working' });
});
authRouter.use(cookieParser());
app.use('/auth', authRouter);
// add routes
// app.use(router);
// // run server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
module.exports = {
    devServer: {
        Proxy: '*'
    }
}