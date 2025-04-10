const express=require("express");
const connectDB=require('./config/database')
const app=express()
const User=require('./models/user')



app.use(express.json())
app.post('/signup',async (req,res)=>{
    const user=new User(req.body)
  
try{
    await user.save()
res.send('user added successfully')
}catch(err){
    res.status(400).send("Error saving the user:"+err.message);
}
})
connectDB()
.then(()=>{
    console.log("Database connection established");  
})
.catch((err)=>{
console.error("Database cannot be connected");
});

app.listen(7777,()=>{
    console.log("server is listening to the port 7777...");
    
})