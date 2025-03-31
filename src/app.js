const express=require('express')

const app=express()

//This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstName:"Akshay",lastName:"Sam"})
})
app.post("/user",(req,res)=>{
    res.send("Data successfully saved to the database")
    
})

app.delete("/user",(req,res)=>{
    res.send("Data successfully deleted from the database")
})

//use will match all the HTTP METHOD api CALLS TO /test
app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})//request handler
 app.use('/sam',(req,res)=>{
    res.send("Hi sam");

})
app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
    
})

