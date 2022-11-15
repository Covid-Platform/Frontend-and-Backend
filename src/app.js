require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8002;

const Exercise = require("./models/exercise");
const Recipe = require("./models/recipes");

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

require('./db/connect');

const exerciseRouter = require("./routers/physiotherapy");
const recipeRouter = require("./routers/recipes");
const userRouter = require("./routers/user");
const auth = require("./middleware/auth")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(exerciseRouter);
app.use(recipeRouter);
app.use(userRouter);
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.use(cookieParser());

app.get("/", async (request, response) => {
    response.render("home");
    // response.render("index");
})

app.get("/signup", async (request, response) => {
    response.render("registration");
})

app.get("/signin", async (request, response) => {
    response.render("login");
})

app.get("/profile", auth, async (request, response) => {
    response.render("profile", {
        post: {
            email: request.user.email,
            password: request.user.password,
            fullName: request.user.fullName,
            contactNumber: request.user.contactNumber,
            dob: request.user.dob,
            address: request.user.address,
            gender: request.user.gender,
            vaccineStatus: request.user.vaccineStatus
        }
    });
})

app.get("/prediction", auth, async (request, response) => {
    // console.log(request.cookies.jwt);
    response.render("prediction");
})

app.get("/physiotherapy", auth, async (request, response) => {
    try {
        const exercise = await Exercise.find();
        console.log("The success part:\n" + exercise);
        response.status(200).render("physiotherapy", {
            post: {
                exercises: exercise
            }
        });
        // response.status(200).send("Successfully Fetched: " + exercise);
    } catch (e) {
        console.log(e);
        response.status(404).send(e);
    }
})

app.get("/recipe", auth, async (request, response) => {
    try {
        const recipe = await Recipe.find();
        console.log("The success part:\n" + recipe);
        // response.status(200).send("Successfully Fetched:\n" + recipe);
        response.status(200).render("recipe", {
            post: {
                recipes: recipe,
            }
        });
    } catch (e) {
        response.status(404).send(e);
    }
})

app.get("/logout", auth, async (request, response) => {
    try {
        console.log(request.user);
        response.clearCookie("jwt");
        console.log("Logout Successfully");

        await request.user.save();
        response.render("Home");
    } catch (error) {

    }
})

app.listen(port, () => {
    console.log(`The connection is setup at ${port}`);
})