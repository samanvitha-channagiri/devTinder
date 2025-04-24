//import express librart
const express = require("express");
//function to connect to mongodb databse
const connectDB = require("./config/database");
//express application instance
const app = express();
//importing the User model-->use this to interact with the users collection in mongoDB
const User = require("./models/user");
//to parse incoming JSON data in the req body without this req.body will be undefined
app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating the new instance of the userModel
  const user = new User(req.body);

  try {
    //saving the user in db collection
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    throw new Error("Update not allowed")

}
});
//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //    const users= await User.find({emailId:userEmail})//gets all the peeps with this email id
    //       if(users.length===0){
    //         res.status(404).send("user not found");
    //       }else{
    //          res.send(users)
    //       }
    //emailId-->the same spelling should be in the defined schems, even though if you have a typo in it mongoose will ignore it-->you'll have a hard time debugging so be careful
    const user = await User.findOne();

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
//Feed API- GET /feed-get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //passing and empty filter gets all the users back to you
    res.send(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user=await User.findByIdAndDelete(userId);
    if (user) {
      res.send("User deleted successfully");
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "age","skills"];
    //making sure that every key is present in the ALLOWED_UPDATES
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      res.status(400).send("update not allowed");
    } 
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10")
        }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    
    res.send(`${user} updated succcessfully`);
  } catch (err) {
    res.status(400).send("UPDATE FALIED:" + err.message);
  }
});
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
