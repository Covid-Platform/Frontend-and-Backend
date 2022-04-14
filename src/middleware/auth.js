const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = (request, reponse, next) => {
    try {
        const token = request.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken);

        next();
    } catch (error) {
        response.status(400).send(error)
    }
}

module.exports = auth;