const express=require('express');
const app=express();
const cors= require('cors');
const PORT=process.env.PORT || 3000;
const authenticate =require('./middleware/authenticate');

//middleware
app.use(express.json()); //to access req.body
app.use(cors());

//route
app.use('/user',require('./Route/user'));
app.use('/dashboard',authenticate,require('./Route/dashboard'));
app.use('/profile',authenticate,require('./Route/profile'));
app.use('/cart',require('./Route/cart'));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}.`)
});
