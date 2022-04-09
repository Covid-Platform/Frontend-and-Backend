require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require("hbs");
const bcryptjs = require("bcryptjs");

const app = express();
const port = process.env.PORT || 8002;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

require('./db/connect');

const User = require("./models/user");
const async = require('hbs/lib/async');
const res = require('express/lib/response');

console.log(process.env.SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", async(request, response) => {
    response.render("index");
})

app.get("/signup", async(request, response) => {
    response.render("signup");
})

app.get("/signin", async(request, response) => {
    response.render("signin");
})

app.post("/signup", async(request, response) => {
    try {
        const password = request.body.password;
        const confirmPassword = request.body.confirmPassword;

        if (password === confirmPassword) {
            const registerUser = new User({
                email: request.body.email,
                password: request.body.password,
                fullName: undefined,
                contactNumber: undefined,
                dob: undefined,
                address: undefined,
                gender: undefined
            });

            console.log("The success part: " + registerUser);

            const token = await registerUser.generateAuthToken();
            console.log("The token is - " + token);

            response.cookie("jwt", token, {
                httpOnly: true
            });

            const createUser = await registerUser.save();
            console.log(createUser);
            response.status(201).render("home");
        } else {
            response.send("Password doesn't match.")
        }
    } catch (e) {
        response.status(404).send(e);
    }
})

app.post("/signin", async(request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const checkUser = await User.findOne({ email: email });
        const status = await bcryptjs.compare(password, checkUser.password);

        const token = await checkUser.generateAuthToken();
        console.log("The token is - " + token);

        response.cookie("jwt", token, {
            httpOnly: true
        });

        if (status) {
            response.status(200).render("home");
        } else {
            response.status(200).send("Password is not matching");
        }
    } catch (e) {
        response.status(404).send(e);
    }
})

app.listen(port, () => {
    console.log(`The connection is setup at ${port}`);
})