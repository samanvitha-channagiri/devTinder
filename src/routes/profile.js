const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth.js");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  //whenever my profile api is called I want to validate my cookie
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    //logged in user which is coming from req.user,is already in an instance of the userSchema
    const loggedinUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));
    await loggedinUser.save();

    res.json({
      message: `${loggedinUser.firstName} your profile updated successfully`,
      data: loggedinUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//forgot password API
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("Old and new passwords are required");
    }
    //If the oldPassword entered by the user matches the password attached with the req.user
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Please enter correct password");
    }
    const tempUser = req.user;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    tempUser.password = hashedPassword;
    await tempUser.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(500).send("ERROR :" + error.message);
  }
});

module.exports = profileRouter;
