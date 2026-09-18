const { sql, poolPromise} = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username or Password are required'});
            
        }
        const pool = await poolPromise ;
        const result = await pool.request()
            .input('user', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE Username = @user');

        if(result.recordset.length === 0){
            return res.status(401).json({ error: 'invalid username or password'});
        }
        const user = result.recordset[0];

        const isMatch = await bcrypt.compare(password, user.PasswordHash);

        if(isMatch === false){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        const token = jwt.sign(
            { userId: user.Id, username: user.Username },
            'mySuperSecretKey',
            { expiresIn: '1h'}
        );
        res.status(200).json({message: 'Login Successful!', token: token});
    } catch (error) {
        console.error('Login error', error);
        res.status(500).json({ error: 'Failed to login User'});
    }

};

module.exports = {
    registerUser,
    loginUser
    
};