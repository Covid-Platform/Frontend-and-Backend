const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
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
    }
});

const Exercise = new mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;