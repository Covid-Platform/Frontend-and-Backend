const mongoose = require("mongoose");

// const db = "mongodb+srv://covid-platform:covid-platform@cluster0.wasrhta.mongodb.net/test"
mongoose.connect(`mongodb+srv://${process.env.DATABASE}:${process.env.PASSWORD}@cluster0.wasrhta.mongodb.net/users`).then(() => {
    console.log("Connection is successfully connected.");
}).catch((e) => {
    console.log("Error!!");
    console.log(e);
});