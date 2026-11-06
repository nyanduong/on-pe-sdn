const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/auth');

router.get('/', auth, reportController.getReports);

module.exports = router;
