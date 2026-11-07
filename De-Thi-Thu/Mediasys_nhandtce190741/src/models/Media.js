const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: String,
    category: String,
    year: Number,
    description: String,
    posterUrl: String,
    averageRating: Number,
    type: String,
    image: String,
    createdAt: Date
}, { versionKey: false });

module.exports = mongoose.model('Media', mediaSchema, 'Medias');
