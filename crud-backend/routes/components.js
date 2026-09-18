const express = require('express');
const router = express.Router();

const hardwareController = require('../controllers/hardwareController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', hardwareController.getAllComponents);
router.post('/', verifyToken, hardwareController.createComponents);
router.put('/:id', verifyToken, hardwareController.updateComponents);
router.delete('/:id', verifyToken, hardwareController.deleteComponents);

module.exports = router;