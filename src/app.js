const express=require('express')
const app=express()
const {adminAuth}=require('./middlewares/auth')
app.use('/admin',adminAuth)

app.listen(7777,()=>{
    console.log("server is listening to the port 7777...");
    
})

// const express=require("express");
// const app=express()
// const {adminAuth,userAuth}=require('./middlewares/auth')
// //use yak use madbek andre igs /admin bardide ala, prati ond request kooda middleware na pass madine hogbeku
// app.use('/admin',adminAuth)


// //login api ge authentication restriction beda,so nav userAuth hakadilla illi.. middleware bardiradakke, nav ell beko all use madkotiv nodi
// app.post('/user/login',(req,res)=>{
//     res.send('user logged in successfully')
// })

// // app.use('/user',userAuth) //onde route handler iradrinda ee line na skit madi kelag check madbodu hinge
// app.get("/user",userAuth,(req,res)=>{
//    res.send("All data sent")
// })
// app.get("admin/getAllData",(req,res)=>{
//     res.send("All data sent");
// })
// app.get("/admin/Delete",(req,res)=>{
//     //Logic of checking if the request is authorized
//     res.send("Deleted the user")
//     })

// app.listen(7777,()=>{
//     console.log("server is listening to the port 7777...");
//     
// })