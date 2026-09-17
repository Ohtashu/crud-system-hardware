const express = require('express');
const router = express.Router();

const hardwareController = require('../controllers/hardwareController');

router.get('/', hardwareController.getAllComponents);
router.post('/', hardwareController.createComponents);
module.exports = router;