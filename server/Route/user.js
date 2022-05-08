const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');

//registraion
router.post('/signUp', async (req, res) => {
    try {
        //destructive method
        const { user_firstName, user_lastName, user_email, user_password } = req.body;

        // check user if exist if so then return error message
        const isUserExist = await pool.query('SELECT * FROM users WHERE user_email=$1', [user_email]);

        if (isUserExist.rows.length !== 0) {
            return res.json('user is existed');
        }

        //convert user password using bcrypt
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const passwordHash = await bcrypt.hash(user_password, salt);

        //insert user in to table 
        const newUser = await pool.query('INSERT INTO users (user_firstName,user_lastName,user_email,user_password) VALUES ($1,$2,$3,$4) RETURNING *', [user_firstName, user_lastName, user_email, passwordHash]);

        //generate json web token
        const token = await jwtGenerator(newUser.rows[0].user_id);
        return res.status(200).json(token);
    } catch (error) {
        console.log(error);
        return res.status(500).json('server Error');
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        // desctructing all data 
        const { user_email, user_password } = req.body;
        //check user is exist if not then return error
        const isUserExist = await pool.query('SELECT * FROM users WHERE user_email=$1', [user_email]);
        if (isUserExist.rows.length === 0) {
            return res.status(401).json('Email or Password is invalid');
        }
        //compare user password
        const isValidPassword = await bcrypt.compare(user_password, isUserExist.rows[0].user_password);

        if (!isValidPassword) {
            return res.status(401).json('Email or Password is invalid');
        } else {
             //generate json web token
            const token = await jwtGenerator(isUserExist.rows[0].user_id);
            return res.status(200).json(token);
        }
       
    } catch (error) {
        return res.status(500).json('server Error')
    }
});


module.exports = router;