const express = require('express');
const router = express.Router();

const hardwareController = require('../controllers/hardwareController');

router.get('/', hardwareController.getAllComponents);
router.post('/', hardwareController.createComponents);
router.put('/:id', hardwareController.updateComponents);
router.delete('/:id', hardwareController.deleteComponents);

module.exports = router;