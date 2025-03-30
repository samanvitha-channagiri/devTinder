const express=require('express')

const app=express()

app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})//request handler


app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
    
})