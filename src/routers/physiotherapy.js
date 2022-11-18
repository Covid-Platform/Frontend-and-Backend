const express = require("express");
const router = new express.Router();
const path = require('path');
const hbs = require("hbs");

const Exercise = require("../models/exercise");
const auth = require("../middleware/auth");

const app = express();

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

router.post("/physiotherapy", async(request, response) => {
    try {
        const exercise = new Exercise({
            title: request.body.title,
            description: request.body.description,
            image: request.body.image,
            steps: request.body.steps
        });
        console.log("The success part: " + exercise);
        const createExercise = await exercise.save();
        console.log(createExercise);
        response.status(201).send("Successfully Created:\n" + createExercise);
    } catch (e) {
        response.status(404).send(e);
    }
})

// router.get("/physiotherapy", auth, async(request, response) => {
//     try {
//         const exercise = await Exercise.find();
//         console.log("The success part:\n" + exercise);
//         response.status(200).render("physiotherapy");
//         // response.status(200).send("Successfully Fetched: " + exercise);
//     } catch (e) {
//         console.log(e);
//         response.status(404).send(e);
//     }
// })

module.exports = router;