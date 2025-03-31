const express=require("express");
const app=express()

app.get('/user/:userid/:username/:userpass',(req,res)=>{
        res.send({firstName:"sam",lastName:"Sam"})
        console.log(req.params);
        console.log(req.query);

        
})

app.listen(7777,()=>{
    console.log("server is listening to the port 7777");
    
})