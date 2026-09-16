const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query('SELECT @@VERSION as versions');

        res.json(result.recordset);
    }
    catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;