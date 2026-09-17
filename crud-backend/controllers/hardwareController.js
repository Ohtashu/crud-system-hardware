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

// UPDATE CRUD
const updateComponents = async (req, res) => {
    try {
        const {id} = req.params;

        const {hardware_name, category, brand, quantity, price} = req.body;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, hardware_name)
            .input('cat', sql.VarChar, category)
            .input('brand', sql.VarChar, brand)
            .input('qty', sql.Int, quantity)
            .input('price', sql.Decimal, price)
            .query(`
                UPDATE hardware
                SET hardware_name= @name,
                    category     = @cat,
                    brand        = @brand,
                    quantity     = @qty,
                    price        = @price
                WHERE id = @id
            `);

        if (result.rowsAffected === 0) {
            return res.status(404).json({message: 'Component not found! Are you sure thhat ID exists?'})
        }

        res.status(200).json({message: 'Hardware component updated successfully!'});

    }
    catch (error) {
            console.error('Error updating component: ', error);
            res.status(500).json({error: 'Failed to update hardware component'});
    }
};

    const deleteComponents = async (req, res) => {
        try {
            const {id} = req.params;

            const pool = await poolPromise;

            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`DELETE FROM hardware WHERE id = @id`);

            if(result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'Component not found! It may have already been deleted!'});
            }
            res.status(200).json({ message: 'Hardware deleted successfully!'});
        }
        catch (error) {
            console.error('Error deleteting component: ' , error);
            res.status(500).json({error: 'Failed to delete hardware component'});
        }
    };
module.exports = {
    getAllComponents,
    createComponents,
    updateComponents,
    deleteComponents
};