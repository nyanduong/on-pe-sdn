const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Rating', ratingSchema, 'Ratings');
