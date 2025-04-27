const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
//express application instance
const app = express();



app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)


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
