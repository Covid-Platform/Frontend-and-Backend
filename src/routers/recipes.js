const express = require("express");
const router = new express.Router();
const path = require('path');
const hbs = require("hbs");

const Recipe = require("../models/recipes");

const app = express();

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

router.post("/recipe", async(request, response) => {
    try {
        const recipe = new Recipe({
            title: request.body.title,
            description: request.body.description,
            image: request.body.image
        });
        console.log("The success part: " + recipe);
        const createRecipe = await recipe.save();
        console.log(createRecipe);
        response.status(201).send("Successfully Created:\n" + createRecipe);
    } catch (e) {
        response.status(404).send(e);
    }
})

router.get("/recipe", async(request, response) => {
    try {
        const recipe = await Recipe.find();
        console.log("The success part:\n" + recipe);
        // response.status(200).send("Successfully Fetched:\n" + recipe);
        response.status(200).render("recipe");
    } catch (e) {
        response.status(404).send(e);
    }
})

module.exports = router;