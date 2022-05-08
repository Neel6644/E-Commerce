const pool = require('../db');
const authenticate = require('../middleware/authenticate');

const router = require('express').Router();

router.post('/addCart',authenticate,async(req,res)=>{
    //destructive
    const {product_id}=req.body;


    const cart=await pool.query('INSERT INTO carts (user_id) VALUES($1) RETURNING *',[req.user]);
    if(cart.rows.length !== 0){
       const cartItem=await pool.query('INSERT INTO cartitems(product_id,cart_id) VALUES ($1,$2) RETURNING *',[product_id,cart.rows[0].cart_id]);
       if(cartItem.rows.length === 0){
           return res.json('something wrong');
       }
       return res.json(cartItem.rows[0]);
    }
    //return res.json(cart.rows[0]);

});



module.exports = router;