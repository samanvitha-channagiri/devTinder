const express=require('express')
const { userAuth } = require('../middlewares/auth')
const User=require('../models/user')
const connectionRequeset=require('../models/connectionRequest')
const userRouter=express.Router()

//getting  all the pending connection requests for the logged in user
userRouter.get('/user/requests',userAuth,(req,res,next)=>{
 try{
    const loggedInUser=req.user;
    


 }catch(error){
    res.status(400).send("ERROR :"+error.message);

 }

})


module.exports=userRouter