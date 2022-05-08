const pool = require('../db');
const authenticate = require('../middleware/authenticate');
const bcrypt=require('bcrypt');
const { route } = require('./user');

const router = require('express').Router();

//update user name
router.put('/updateUserName', authenticate, async (req, res) => {
    try {
        //destructive body data
        const { user_firstName, user_lastName } = req.body;

        const update=await pool.query('UPDATE users SET user_firstName=$1,user_lastName=$2 WHERE user_id=$3 RETURNING *',[user_firstName,user_lastName,req.user]);

        if(update.rows.length === 0){
            return res.status(403).json('you can not able to update');
        }

        return res.json(update.rows[0]);

    } catch (error) {
        console.log(error)
        return res.status(500).json('Server Error');
    }
});

//update user password
router.put('/updatePassword',authenticate,async(req,res)=>{
    try {
        //destructive data
        const {user_password}=req.body;

        //check if password is same as old pass then return error message;
        const userdata=await pool.query('SELECT user_password FROM users WHERE user_id=$1',[req.user]);
        
        //check password same or not 
        const password=await bcrypt.compare(user_password,userdata.rows[0].user_password);
        if(password){
            return res.json('You have entered same password.');
        }

        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const passwordHash=await bcrypt.hash(user_password,salt);

        const updatedPassword= await pool.query('UPDATE users SET user_password=$1 WHERE user_id=$2 RETURNING *',[passwordHash,req.user]);
        if(updatedPassword.rows.length === 0){
            return res.json(`you can't able to udpdate your password`);
        }
        return res.json(updatedPassword.rows[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
});

module.exports = router;