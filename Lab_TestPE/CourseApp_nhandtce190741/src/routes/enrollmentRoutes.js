const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middlewares/auth');
router.post('/', auth, enrollmentController.signupEnrollment);

module.exports = router;
