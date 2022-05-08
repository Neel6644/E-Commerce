const pool = require('../db');
const authenticate = require('../middleware/authenticate');

const router=require('express').Router();

router.get('/',authenticate,async(req,res)=>{
    
    const getUser=await pool.query('SELECT * FROM users WHERE user_id=$1',[req.user]);
    if(getUser.rows.length === 0){
        return res.status(500).json('server Error');
    }
    return res.json(getUser.rows[0]);

}); 

router.get('/products/:category', authenticate, async (req, res) => {
    try {
        //destructive data
        const { category } = req.params;
        const getProducts = await pool.query('SELECT * FROM products WHERE category=$1',[category]);
        if (getProducts.rows.length === 0) {
            return res.json(`sorry,right now we don not have ${category} products.`);
        }
        return res.json(getProducts.rows);
        

    } catch (error) {
        console.log(error);
        return res.status(500).json('Server Error');
    }
    ;
});


module.exports=router;