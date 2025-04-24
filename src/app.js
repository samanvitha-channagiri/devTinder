//import express librart
const express = require("express");
//function to connect to mongodb databse
const connectDB = require("./config/database");
const bcrypt=require('bcrypt')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const {userAuth}=require('./middlewares/auth.js')
//express application instance
const app = express();

//importing the User model-->use this to interact with the users collection in mongoDB
const User = require("./models/user");
const {validateSignupData}=require('./utils/validation');
const cookieParser = require("cookie-parser");

//to parse incoming JSON data in the req body without this req.body will be undefined
app.use(express.json());
app.use(cookieParser())

app.get("/profile",userAuth,async(req,res)=>{
  //whenever my profile api is called I want to validate my cookie
  try{
  const user=req.user
  
  res.send(user)
  }catch(error){
    res.status(400).send("ERROR "+error.message)
  }
})

app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body

    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials")
    }

    const isPasswordValid=bcrypt.compare(password,user.password)

    if(isPasswordValid){
      //Create  JWT Token

      const token=await jwt.sign({_id:user._id},"DEV@Tinder$790");
      //Add the token to cookie and send the response back to the user
      res.cookie("token",token)
      res.send("User logged in successfully")
    }else{
      throw new Error("Invalid credentials")
    }
    
  }catch(error){
    console.log("Error in login controller",error.message);
    res.status(400).send("ERROR: "+error.message)
    
  }
})

app.post("/signup", async (req, res) => {


  //creating the new instance of the userModel
  
  try {
    validateSignupData(req);
    const {firstName,lastName,emailId,password}=req.body
    const passwordHash=await bcrypt.hash(password,10)
   
    
    const user = new User({firstName,lastName,emailId,password:passwordHash});
    //saving the user in db collection
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: "+err.message)

}
});
app.post("/sendConnection/Request",async(req,res)=>{
  console.log("Sending a connection request");

  res.send("connection Request sent")
  

})
connectDB()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Database cannot be connected");
    console.log(err);
  });

app.listen(7777, () => {
  console.log("server is listening to the port 7777...");
});
