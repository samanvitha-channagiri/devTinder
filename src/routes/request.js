const express=require('express')
const User = require("../models/user.js");
const { userAuth } = require("../middlewares/auth.js");
const requestRouter=express.Router()

//I want this api to be hit, only when the user is logged in right?that's why userAuth

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
  
    console.log("Sending a connection request");
  
    res.send(user.firstName + " sent the connection request");
  });

  module.exports=requestRouter;