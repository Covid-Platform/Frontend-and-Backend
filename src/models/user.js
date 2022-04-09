// require('dotenv').config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Email Id already exist."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    contactNumber: {
        type: Number,
        maxlength: 10,
        minlength: 10,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    gender: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("Error!:" + error);
        console.log("Error!:" + error);
    }
}

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        console.log(`The current password is ${this.password}`);
        this.password = await bcryptjs.hash(this.password, 10);
        console.log(`The current password is ${this.password}`);
    }
    next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;