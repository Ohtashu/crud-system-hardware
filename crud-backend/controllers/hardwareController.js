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

//For CREATE (CRUD)
const createComponents = async (req, res) => {
    try {
        const { hardware_name, category, brand, quantity, price } = req.body;

        const pool = await poolPromise;

        await pool.request()
            .input('name', sql.VarChar, hardware_name)
            .input('cat', sql.VarChar, category)
            .input('brand', sql.VarChar, brand)
            .input('qty', sql.Int, quantity)
            .input('price', sql.Int, price)
            .query(`
                    INSERT INTO hardware(hardware_name, category, brand, quantity, price)
                    VALUES (@name, @cat, @brand, @qty, @price)
                  `);
        res.status(201).json({ message: 'Hardware component added successfully!' });

    } catch (error) {
        console.error('Error creating component: ',error);
        res.status(500).json({error: 'Failed to create hardware component'});

    }
};

module.exports = {
    getAllComponents,
    createComponents
};