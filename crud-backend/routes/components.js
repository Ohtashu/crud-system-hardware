const express = require('express');
const router = express.Router();

const hardwareController = require('../controllers/hardwareController');

router.get('/', hardwareController.getAllComponents);

module.exports = router;