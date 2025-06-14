const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
};

module.exports = {
  userAuth,
};

//  const adminAuth=(req,res,next)=>{
//     console.log('admin auth is getting checked');
//     //Logic of checking if the request is authorized
//     const token='xyz'
//     const isAdminAuthorized=token=='xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")

//     }else{
//         next()
//     }
// };
// const userAuth=(req,res,next)=>{
//     console.log('admin auth is getting checked');
//     //Logic of checking if the request is authorized
//     const token='xyabcz'
//     const isAdminAuthorized=token=='xyz'
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request")

//     }else{
//         next()
//     }
// };

// module.exports={
//     adminAuth,userAuth
// }
