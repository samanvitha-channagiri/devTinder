const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const validator = require("validator");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

//express application instance
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)


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
