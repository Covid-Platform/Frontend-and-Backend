const mongoose = require("mongoose");
require('mongoose-type-url');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    ingredients: [{
        type: String
    }],
    steps: [{
        type: String
    }]
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;