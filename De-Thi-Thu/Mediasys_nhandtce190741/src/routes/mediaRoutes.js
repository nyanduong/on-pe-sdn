const express = require('express');
const mediaController = require('../controllers/mediaController');
const auth = require('../middlewares/auth');

const router = express.Router();
router.get('/', mediaController.getMedias);
router.put('/:id/comment', auth, mediaController.addComment);

module.exports = router;
