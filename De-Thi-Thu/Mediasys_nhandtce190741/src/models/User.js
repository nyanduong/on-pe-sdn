const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    createdAt: { type: Date }
});

module.exports = mongoose.model("User", userSchema);