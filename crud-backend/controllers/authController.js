const {sql, poolPromise} = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username or Password are required'});

        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash (password, saltRounds);

        const pool = await poolPromise;

        await pool.request()
            .input('user', sql.VarChar, username)
            .input('hash', sql.VarChar, hashedPassword)
            .query(`
            INSERT INTO Users (Username, PasswordHash)
            VALUES(@user, @hash)
                  `);
        return res.status(201).json({ message: 'User registered successfully!'});

    } catch (error) {
        console.error('Registration error', error);

        if (error.message.includes('UNIQUE KEY constraint')){
            return res.status(400).json({ error: 'Username already exists. Please choose another.'});
        }

        res.status(500).json({ error: 'Failed to register User'});

    }
};

module.exports = {
    registerUser
};