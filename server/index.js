const express=require('express');
const app=express();
const cors= require('cors');
const PORT=process.env.PORT || 3000;

//middleware
app.use(express.json()); //to access req.body
app.use(cors());

//route


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}.`)
});
