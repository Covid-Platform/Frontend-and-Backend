require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8002;

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

app.get("/profile", auth, async(request, response) => {
    response.render("profile");
})

// app.get("/recipe", async(request, response) => {
//     response.render("recipe");
// })

// app.get("/physiotherapy", async(request, response) => {
//     response.render("physiotherapy");
// })

app.get("/prediction", auth, async(request, response) => {
    // console.log(request.cookies.jwt);
    response.render("prediction");
})

app.get("/logout", auth, async (request, response) => {
    try{
        console.log(request.user);
        response.clearCookie("jwt");
        console.log("Logout Successfully");

        await request.user.save();
        response.render("Home");
    } catch(error) {

    }
})

app.listen(port, () => {
    console.log(`The connection is setup at ${port}`);
})