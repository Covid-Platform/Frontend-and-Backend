const express = require("express");
const router = new express.Router();
const bcryptjs = require("bcryptjs");
const path = require('path');
const hbs = require("hbs");

const User = require("../models/user");

const app = express();

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

router.post("/signup", async (request, response) => {
    try {
        console.log("Hello");
        const password = request.body.password;
        const confirmPassword = request.body.confirmPassword;
        console.log(request.body.gender);

        if (password === confirmPassword) {
            const registerUser = new User({
                email: request.body.email,
                password: request.body.password,
                fullName: request.body.fullName,
                contactNumber: request.body.contactNumber,
                dob: request.body.dob,
                address: request.body.address,
                gender: request.body.gender,
                vaccineStatus: request.body.vaccineStatus == "Vaccinated with Dose 1" ? "1" : request.body.vaccineStatus == "Vaccinated with Dose 2" ? "2" : request.body.vaccineStatus
            });

            console.log("The success part: " + registerUser);

            const token = await registerUser.generateAuthToken();
            console.log("The token is - " + token);

            response.cookie("jwt", token, {
                expires: new Date(Date.now() + 6000000),
                httpOnly: true,
                secure: true,
            });

            const createUser = await registerUser.save();
            console.log(createUser);
            response.status(201).render("home", {
                post: {
                    login: true
                }
            });
        } else {
            response.render("registration", {
                post: {
                    errorMessage: "Confirm Password doesn't match with password",
                }
            })
        }
    } catch (e) {
        response.status(404).send(e);
    }
})


router.post("/signin", async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const checkUser = await User.findOne({ email: email });
        const status = await bcryptjs.compare(password, checkUser.password);

        const token = await checkUser.generateAuthToken();
        console.log("The token is - " + token);

        response.cookie("jwt", token, {
            expires: new Date(Date.now() + 6000000),
            httpOnly: true,
            secure: true,
        });

        console.log(status);

        if (status) {
            response.status(200).render("home", {
                post: {
                    login: true
                }
            });
        } else {
            console.log(status);
            response.render("login", {
                post: {
                    errorMessage: "Wrong Paasword"
                }
            });
        }
    } catch (e) {
        response.status(404).send(e);
    }
})

module.exports = router;