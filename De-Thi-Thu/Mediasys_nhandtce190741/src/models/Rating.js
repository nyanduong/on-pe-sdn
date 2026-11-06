const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    mediaId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },
    rating: { type: Number },
    comment: { type: String },
    createdAt: { type: Date }
});

module.exports = mongoose.model("Rating", ratingSchema);