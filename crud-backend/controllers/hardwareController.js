const { sql, poolPromise } = require('../config/db');

const getAllComponents = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.query('SELECT * FROM hardware');
        res.status(200).json(result.recordset);
    }
    catch (error) {
        console.error('Error fetching components: ', error);

        res.status(500).json({error: 'Failed to retrieve hardware components'});
    }
};

module.exports = {
    getAllComponents
};