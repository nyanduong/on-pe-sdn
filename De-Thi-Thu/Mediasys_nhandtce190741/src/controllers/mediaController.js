const mongoose = require('mongoose');
const Media = require('../models/Media');
const Rating = require('../models/Rating');

exports.getMedias = async (req, res) => {
    res.json(await Media.find().lean());
};

exports.addComment = async (req, res) => {
    const { score, comment } = req.body || {};
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(400).json({ message: 'Invalid media ID' });
    }
    if (!Number.isFinite(score) || typeof comment !== 'string' || !comment.trim()) {
        return res.status(400).json({ message: 'Provide a numeric score and a comment' });
    }
    if (!await Media.exists({ _id: req.params.id })) {
        return res.status(404).json({ message: 'Media not found' });
    }
    const rating = await Rating.create({
        mediaId: req.params.id,
        userId: req.user.id,
        score,
        comment
    });
    res.status(201).json(rating);
};
