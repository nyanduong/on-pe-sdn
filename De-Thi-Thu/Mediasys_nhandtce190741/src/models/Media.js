const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    title: { type: String },
    category: { type: String },
    year: { type: Number },
    description: { type: String },
    posterUrl: { type: String },
    averageRating: { type: Number }
});

module.exports = mongoose.model("Media", mediaSchema);