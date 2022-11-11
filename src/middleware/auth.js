const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken);

        const user = await User.findOne({_id:verifyToken._id});

        request.token = token;
        request.user = user;

        next();
    } catch (error) {
        console.log(error);
        response.status(400).send("User is not logged in.")
    }
}

module.exports = auth;