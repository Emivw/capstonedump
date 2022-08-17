const authJwt = require("../middleware/auth.jwt");
const verifySignUp = require("../middleware/verifySignUp.js");
module.exports = {
    authJwt,
    verifySignUp
};