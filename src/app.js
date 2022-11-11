require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8002;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

require('./db/connect');

const Exercise = require("./models/exercise");

const exerciseRouter = require("./routers/physiotherapy");
const recipeRouter = require("./routers/recipes");
const userRouter = require("./routers/user");

console.log(process.env.SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(exerciseRouter);
app.use(recipeRouter);
app.use(userRouter);
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", async(request, response) => {
    response.render("home");
    // response.render("index");
})

app.get("/signup", async(request, response) => {
    response.render("signup");
})

app.get("/signin", async(request, response) => {
    response.render("signin");
})

app.get("/profile", async(request, response) => {
    response.render("profile");
})

// app.get("/recipe", async(request, response) => {
//     response.render("recipe");
// })

// app.get("/physiotherapy", async(request, response) => {
//     response.render("physiotherapy");
// })

app.get("/prediction", async(request, response) => {
    response.render("prediction");
})

app.listen(port, () => {
    console.log(`The connection is setup at ${port}`);
})