const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

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
    confirmPassword: {
        type: String,
        required: true,
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
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, "thisisourgroupprojectandourtopiciscovidplatform");
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
    if (this.Modified("password")) {
        console.log(`The current password is ${this.password}`);
        const securePassword = await bcryptjs.hash(this.password, 10);
        console.log(`The current password is ${this.password}`);
        this.confirmPassword = undefined;
    }
    next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;