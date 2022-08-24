require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./controllers/auth.controller');

const app = express();



const PORT = process.env.PORT | 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

authRouter.use(cookieParser());

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server is listening  on http://localhost:${PORT}`);
});

module.exports = app;