const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`).then(() => {
    console.log("Connection is successfully connected.");
}).catch((e) => {
    console.log("Error!!");
    console.log(e);
});